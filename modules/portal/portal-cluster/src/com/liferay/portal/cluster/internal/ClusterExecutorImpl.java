/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portal.cluster.internal;

import aQute.bnd.annotation.metatype.Configurable;

import com.liferay.portal.cluster.ClusterChannel;
import com.liferay.portal.cluster.ClusterChannelFactory;
import com.liferay.portal.cluster.ClusterReceiver;
import com.liferay.portal.cluster.configuration.ClusterExecutorConfiguration;
import com.liferay.portal.cluster.internal.constants.ClusterPropsKeys;
import com.liferay.portal.kernel.cluster.Address;
import com.liferay.portal.kernel.cluster.ClusterEvent;
import com.liferay.portal.kernel.cluster.ClusterEventListener;
import com.liferay.portal.kernel.cluster.ClusterException;
import com.liferay.portal.kernel.cluster.ClusterExecutor;
import com.liferay.portal.kernel.cluster.ClusterInvokeThreadLocal;
import com.liferay.portal.kernel.cluster.ClusterLink;
import com.liferay.portal.kernel.cluster.ClusterNode;
import com.liferay.portal.kernel.cluster.ClusterNodeResponse;
import com.liferay.portal.kernel.cluster.ClusterRequest;
import com.liferay.portal.kernel.cluster.FutureClusterResponses;
import com.liferay.portal.kernel.concurrent.ConcurrentReferenceValueHashMap;
import com.liferay.portal.kernel.executor.PortalExecutorManager;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.memory.FinalizeManager;
import com.liferay.portal.kernel.util.CharPool;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.HashUtil;
import com.liferay.portal.kernel.util.Http;
import com.liferay.portal.kernel.util.MethodHandler;
import com.liferay.portal.kernel.util.Props;
import com.liferay.portal.kernel.util.PropsKeys;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.uuid.PortalUUIDUtil;
import com.liferay.portal.util.PortalInetSocketAddressEventListener;

import java.io.Serializable;

import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;

/**
 * @author Tina Tian
 * @author Shuyang Zhou
 */
@Component(
	configurationPid = "com.liferay.portal.cluster.configuration.ClusterExecutorConfiguration",
	immediate = true,
	service = {
		ClusterExecutor.class, PortalInetSocketAddressEventListener.class
	}
)
public class ClusterExecutorImpl
	implements ClusterExecutor, PortalInetSocketAddressEventListener {

	@Override
	@Reference(
		cardinality = ReferenceCardinality.MULTIPLE,
		policy = ReferencePolicy.DYNAMIC
	)
	public void addClusterEventListener(
		ClusterEventListener clusterEventListener) {

		_clusterEventListeners.addIfAbsent(clusterEventListener);
	}

	@Override
	public FutureClusterResponses execute(ClusterRequest clusterRequest) {
		if (!isEnabled()) {
			return null;
		}

		Set<String> clusterNodeIds = new HashSet<>();

		if (clusterRequest.isMulticast()) {
			clusterNodeIds = new HashSet<>(_clusterNodeStatuses.keySet());

			if (clusterRequest.isSkipLocal()) {
				clusterNodeIds.remove(
					_localClusterNodeStatus.getClusterNodeId());
			}
		}
		else {
			clusterNodeIds.addAll(clusterRequest.getTargetClusterNodeIds());
		}

		FutureClusterResponses futureClusterResponses =
			new FutureClusterResponses(clusterNodeIds);

		if (!clusterRequest.isFireAndForget()) {
			String uuid = clusterRequest.getUuid();

			_futureClusterResponses.put(uuid, futureClusterResponses);
		}

		if (clusterNodeIds.remove(_localClusterNodeStatus.getClusterNodeId())) {
			ClusterNodeResponse clusterNodeResponse = executeClusterRequest(
				clusterRequest);

			if (!clusterRequest.isFireAndForget()) {
				futureClusterResponses.addClusterNodeResponse(
					clusterNodeResponse);
			}
		}

		if (clusterRequest.isMulticast()) {
			_clusterChannel.sendMulticastMessage(clusterRequest);
		}
		else {
			for (String clusterNodeId : clusterNodeIds) {
				ClusterNodeStatus clusterNodeStatus = _clusterNodeStatuses.get(
					clusterNodeId);

				if (clusterNodeStatus == null) {
					if (_log.isWarnEnabled()) {
						_log.warn(
							"Unable to find cluster node " + clusterNodeId +
								" while executing " + clusterRequest);
					}

					continue;
				}

				_clusterChannel.sendUnicastMessage(
					clusterRequest, clusterNodeStatus.getAddress());
			}
		}

		return futureClusterResponses;
	}

	@Override
	public List<ClusterEventListener> getClusterEventListeners() {
		return Collections.unmodifiableList(_clusterEventListeners);
	}

	@Override
	public List<ClusterNode> getClusterNodes() {
		if (!isEnabled()) {
			return Collections.emptyList();
		}

		List<ClusterNode> clusterNodes = new ArrayList<>();

		for (ClusterNodeStatus clusterNodeStatus :
				_clusterNodeStatuses.values()) {

			clusterNodes.add(clusterNodeStatus.getClusterNode());
		}

		return clusterNodes;
	}

	@Override
	public ClusterNode getLocalClusterNode() {
		if (!isEnabled()) {
			return null;
		}

		return _localClusterNodeStatus.getClusterNode();
	}

	@Override
	public boolean isClusterNodeAlive(String clusterNodeId) {
		if (!isEnabled()) {
			return false;
		}

		return _clusterNodeStatuses.containsKey(clusterNodeId);
	}

	@Override
	public boolean isEnabled() {
		return _clusterLink.isEnabled();
	}

	@Override
	public void portalLocalInetSocketAddressConfigured(
		InetSocketAddress inetSocketAddress, boolean secure) {

		if (!isEnabled() || (_localClusterNodeStatus == null)) {
			return;
		}

		ClusterNode localClusterNode = _localClusterNodeStatus.getClusterNode();

		if (!isEnabled() || (localClusterNode.getPortalProtocol() != null)) {
			return;
		}

		localClusterNode.setPortalInetSocketAddress(inetSocketAddress);

		if (secure) {
			localClusterNode.setPortalProtocol(Http.HTTPS);
		}
		else {
			localClusterNode.setPortalProtocol(Http.HTTP);
		}

		sendNotifyRequest();
	}

	@Override
	public void portalServerInetSocketAddressConfigured(
		InetSocketAddress inetSocketAddress, boolean secure) {
	}

	@Override
	public void removeClusterEventListener(
		ClusterEventListener clusterEventListener) {

		if (!isEnabled()) {
			return;
		}

		_clusterEventListeners.remove(clusterEventListener);
	}

	public void setClusterEventListeners(
		List<ClusterEventListener> clusterEventListeners) {

		_clusterEventListeners.addAllAbsent(clusterEventListeners);
	}

	@Activate
	protected void activate(Map<String, Object> properties) {
		clusterExecutorConfiguration = Configurable.createConfigurable(
			ClusterExecutorConfiguration.class, properties);

		String controlChannelProperties = getControlChannelProperties(
			properties);

		initialize(controlChannelProperties);
	}

	protected void configurePortalInstanceCommunications() {
		if ((_localClusterNodeStatus == null) ||
			Validator.isNull(_props.get(PropsKeys.PORTAL_INSTANCE_PROTOCOL))) {

			return;
		}

		ClusterNode localClusterNode = _localClusterNodeStatus.getClusterNode();

		localClusterNode.setPortalProtocol(
			_props.get(PropsKeys.PORTAL_INSTANCE_PROTOCOL));

		localClusterNode.setPortalInetSocketAddress(
			getConfiguredPortalInetSocketAddress(_props));
	}

	@Deactivate
	protected void deactivate() {
		if (_clusterChannel != null) {
			_clusterChannel.close();
		}

		_clusterChannel = null;

		if (_executorService != null) {
			_executorService.shutdownNow();
		}

		_executorService = null;

		_clusterEventListeners.clear();
		_clusterNodeStatuses.clear();
		_futureClusterResponses.clear();
		_localClusterNodeStatus = null;
	}

	protected ClusterNodeResponse executeClusterRequest(
		ClusterRequest clusterRequest) {

		Serializable payload = clusterRequest.getPayload();

		if (!(payload instanceof MethodHandler)) {
			return ClusterNodeResponse.createExceptionClusterNodeResponse(
				_localClusterNodeStatus.getClusterNode(),
				clusterRequest.getUuid(),
				new ClusterException(
					"Payload is not of type " + MethodHandler.class.getName()));
		}

		MethodHandler methodHandler = (MethodHandler)payload;

		ClusterInvokeThreadLocal.setEnabled(false);

		try {
			return ClusterNodeResponse.createResultClusterNodeResponse(
				_localClusterNodeStatus.getClusterNode(),
				clusterRequest.getUuid(), methodHandler.invoke());
		}
		catch (Exception e) {
			return ClusterNodeResponse.createExceptionClusterNodeResponse(
				_localClusterNodeStatus.getClusterNode(),
				clusterRequest.getUuid(), e);
		}
		finally {
			ClusterInvokeThreadLocal.setEnabled(true);
		}
	}

	protected void fireClusterEvent(ClusterEvent clusterEvent) {
		for (ClusterEventListener listener : _clusterEventListeners) {
			listener.processClusterEvent(clusterEvent);
		}
	}

	protected ClusterChannel getClusterChannel() {
		return _clusterChannel;
	}

	protected InetSocketAddress getConfiguredPortalInetSocketAddress(
		Props props) {

		String portalInstanceInetSocketAddress = props.get(
			PropsKeys.PORTAL_INSTANCE_INET_SOCKET_ADDRESS);

		if (Validator.isNull(portalInstanceInetSocketAddress)) {
			throw new IllegalArgumentException(
				"Portal instance host name and port needs to be set in the " +
					"property \"portal.instance.inet.socket.address\"");
		}

		String[] parts = StringUtil.split(
			portalInstanceInetSocketAddress, CharPool.COLON);

		if (parts.length != 2) {
			throw new IllegalArgumentException(
				"Unable to parse the portal instance host name and port from " +
					portalInstanceInetSocketAddress);
		}

		InetAddress hostInetAddress = null;

		try {
			hostInetAddress = InetAddress.getByName(parts[0]);
		}
		catch (UnknownHostException uhe) {
			throw new IllegalArgumentException(
				"Unable to parse the portal instance host name and port from " +
					portalInstanceInetSocketAddress, uhe);
		}

		int port = -1;

		try {
			port = GetterUtil.getIntegerStrict(parts[1]);
		}
		catch (NumberFormatException nfe) {
			throw new IllegalArgumentException(
				"Unable to parse portal InetSocketAddress port from " +
					portalInstanceInetSocketAddress, nfe);
		}

		return new InetSocketAddress(hostInetAddress, port);
	}

	protected ExecutorService getExecutorService() {
		return _executorService;
	}

	protected FutureClusterResponses getFutureClusterResponses(String uuid) {
		return _futureClusterResponses.get(uuid);
	}

	protected Serializable handleReceivedClusterRequest(
		ClusterRequest clusterRequest) {

		Serializable payload = clusterRequest.getPayload();

		if (payload instanceof ClusterNodeStatus) {
			if (_memberJoined((ClusterNodeStatus)payload)) {
				return ClusterRequest.createMulticastRequest(
					_localClusterNodeStatus, true);
			}

			return null;
		}

		ClusterNodeResponse clusterNodeResponse = executeClusterRequest(
			clusterRequest);

		if (clusterRequest.isFireAndForget()) {
			return null;
		}

		return clusterNodeResponse;
	}

	protected void initialize(String channelPropertiesControl) {
		if (!isEnabled()) {
			return;
		}

		if (Validator.isNull(channelPropertiesControl)) {
			throw new IllegalStateException(
				PropsKeys.CLUSTER_LINK_CHANNEL_PROPERTIES_CONTROL + " or " +
					ClusterPropsKeys.CHANNEL_PROPERTIES_CONTROL + " not set.");
		}

		_executorService = _portalExecutorManager.getPortalExecutor(
			ClusterExecutorImpl.class.getName());

		_clusterReceiver = new ClusterRequestReceiver(this);

		String channelNamePrefix = GetterUtil.getString(
			PropsKeys.CLUSTER_LINK_CHANNEL_NAME_PREFIX,
			ClusterPropsKeys.CHANNEL_NAME_PREFIX_DEFAULT);

		_clusterChannel = _clusterChannelFactory.createClusterChannel(
			channelPropertiesControl, channelNamePrefix + "control",
			_clusterReceiver);

		ClusterNode localClusterNode = new ClusterNode(
			PortalUUIDUtil.generate(), _clusterChannel.getBindInetAddress());

		_localClusterNodeStatus = new ClusterNodeStatus(
			localClusterNode, _clusterChannel.getLocalAddress());

		_memberJoined(_localClusterNodeStatus);

		sendNotifyRequest();

		_clusterReceiver.openLatch();

		configurePortalInstanceCommunications();

		manageDebugClusterEventListener();
	}

	protected void manageDebugClusterEventListener() {
		if (clusterExecutorConfiguration.debugEnabled() &&
			(_debugClusterEventListener == null)) {

			_debugClusterEventListener =
				new DebuggingClusterEventListenerImpl();

			addClusterEventListener(_debugClusterEventListener);
		}
		else if (!clusterExecutorConfiguration.debugEnabled() &&
				 (_debugClusterEventListener != null)) {

			removeClusterEventListener(_debugClusterEventListener);
		}
	}

	protected void memberRemoved(List<Address> departAddresses) {
		List<ClusterNode> departClusterNodes = new ArrayList<>();

		Collection<ClusterNodeStatus> clusterNodeStatusCollection =
			_clusterNodeStatuses.values();

		Iterator<ClusterNodeStatus> iterator =
			clusterNodeStatusCollection.iterator();

		while (iterator.hasNext()) {
			ClusterNodeStatus clusterNodeStatus = iterator.next();

			if (departAddresses.contains(clusterNodeStatus.getAddress())) {
				departClusterNodes.add(clusterNodeStatus.getClusterNode());

				iterator.remove();
			}
		}

		if (departClusterNodes.isEmpty()) {
			return;
		}

		ClusterEvent clusterEvent = ClusterEvent.depart(departClusterNodes);

		fireClusterEvent(clusterEvent);
	}

	@Modified
	protected synchronized void modified(Map<String, Object> properties) {
		clusterExecutorConfiguration = Configurable.createConfigurable(
			ClusterExecutorConfiguration.class, properties);

		manageDebugClusterEventListener();
	}

	protected void sendNotifyRequest() {
		ClusterRequest clusterRequest = ClusterRequest.createMulticastRequest(
			_localClusterNodeStatus, true);

		_clusterChannel.sendMulticastMessage(clusterRequest);
	}

	@Reference(unbind = "-")
	protected void setClusterChannelFactory(
		ClusterChannelFactory clusterChannelFactory) {

		_clusterChannelFactory = clusterChannelFactory;
	}

	@Reference(unbind = "-")
	protected void setClusterLink(ClusterLink clusterLink) {
		_clusterLink = clusterLink;
	}

	@Reference(unbind = "-")
	protected void setPortalExecutorManager(
		PortalExecutorManager portalExecutorManager) {

		_portalExecutorManager = portalExecutorManager;
	}

	@Reference(unbind = "-")
	protected void setProps(Props props) {
		_props = props;
	}

	protected volatile ClusterExecutorConfiguration
		clusterExecutorConfiguration;

	private boolean _memberJoined(ClusterNodeStatus clusterNodeStatus) {
		ClusterNodeStatus oldClusterNodeStatus = _clusterNodeStatuses.put(
			clusterNodeStatus.getClusterNodeId(), clusterNodeStatus);

		if (oldClusterNodeStatus != null) {
			if (!oldClusterNodeStatus.equals(clusterNodeStatus)) {
				if (_log.isInfoEnabled()) {
					_log.info(
						"Updated cluster node " +
							clusterNodeStatus.getClusterNode());
				}
			}

			return false;
		}

		ClusterEvent clusterEvent = ClusterEvent.join(
			clusterNodeStatus.getClusterNode());

		fireClusterEvent(clusterEvent);

		return true;
	}

	private String getControlChannelProperties(Map<String, Object> properties) {
		String controlChannepProperties = GetterUtil.getString(
			properties.get(ClusterPropsKeys.CHANNEL_PROPERTIES_CONTROL));

		if (Validator.isNull(controlChannepProperties)) {
			controlChannepProperties = _props.get(
				PropsKeys.CLUSTER_LINK_CHANNEL_PROPERTIES_CONTROL);
		}

		return controlChannepProperties;
	}

	private static final Log _log = LogFactoryUtil.getLog(
		ClusterExecutorImpl.class);

	private ClusterChannel _clusterChannel;
	private ClusterChannelFactory _clusterChannelFactory;
	private final CopyOnWriteArrayList<ClusterEventListener>
		_clusterEventListeners = new CopyOnWriteArrayList<>();
	private ClusterLink _clusterLink;
	private final Map<String, ClusterNodeStatus> _clusterNodeStatuses =
		new ConcurrentHashMap<>();
	private ClusterReceiver _clusterReceiver;
	private ClusterEventListener _debugClusterEventListener;
	private ExecutorService _executorService;
	private final Map<String, FutureClusterResponses> _futureClusterResponses =
		new ConcurrentReferenceValueHashMap<>(
			FinalizeManager.WEAK_REFERENCE_FACTORY);
	private ClusterNodeStatus _localClusterNodeStatus;
	private PortalExecutorManager _portalExecutorManager;
	private Props _props;

	private static class ClusterNodeStatus implements Serializable {

		@Override
		public boolean equals(Object obj) {
			if (this == obj) {
				return true;
			}

			if (!(obj instanceof ClusterNodeStatus)) {
				return false;
			}

			ClusterNodeStatus clusterNodeStatus = (ClusterNodeStatus)obj;

			if (Validator.equals(_address, clusterNodeStatus._address) &&
				Validator.equals(
					_clusterNode, clusterNodeStatus._clusterNode)) {

				return true;
			}

			return false;
		}

		public Address getAddress() {
			return _address;
		}

		public ClusterNode getClusterNode() {
			return _clusterNode;
		}

		public String getClusterNodeId() {
			return _clusterNode.getClusterNodeId();
		}

		@Override
		public int hashCode() {
			int hash = HashUtil.hash(0, _clusterNode);

			return HashUtil.hash(hash, _address);
		}

		private ClusterNodeStatus(ClusterNode clusterNode, Address address) {
			_clusterNode = clusterNode;
			_address = address;
		}

		private final Address _address;
		private final ClusterNode _clusterNode;

	}

}