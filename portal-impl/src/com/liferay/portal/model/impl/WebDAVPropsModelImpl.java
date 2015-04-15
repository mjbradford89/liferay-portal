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

package com.liferay.portal.model.impl;

import aQute.bnd.annotation.ProviderType;

import com.liferay.portal.kernel.bean.AutoEscapeBeanHandler;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.ProxyUtil;
import com.liferay.portal.kernel.util.StringBundler;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.model.CacheModel;
import com.liferay.portal.model.WebDAVProps;
import com.liferay.portal.model.WebDAVPropsModel;
import com.liferay.portal.service.ServiceContext;
import com.liferay.portal.util.PortalUtil;

import com.liferay.portlet.expando.model.ExpandoBridge;
import com.liferay.portlet.expando.util.ExpandoBridgeFactoryUtil;

import java.io.Serializable;

import java.sql.Types;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * The base model implementation for the WebDAVProps service. Represents a row in the &quot;WebDAVProps&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This implementation and its corresponding interface {@link WebDAVPropsModel} exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in {@link WebDAVPropsImpl}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see WebDAVPropsImpl
 * @see WebDAVProps
 * @see WebDAVPropsModel
 * @generated
 */
@ProviderType
public class WebDAVPropsModelImpl extends BaseModelImpl<WebDAVProps>
	implements WebDAVPropsModel {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this class directly. All methods that expect a web d a v props model instance should use the {@link WebDAVProps} interface instead.
	 */
	public static final String TABLE_NAME = "WebDAVProps";
	public static final Object[][] TABLE_COLUMNS = {
			{ "mvccVersion", Types.BIGINT },
			{ "webDavPropsId", Types.BIGINT },
			{ "companyId", Types.BIGINT },
			{ "createDate", Types.TIMESTAMP },
			{ "modifiedDate", Types.TIMESTAMP },
			{ "classNameId", Types.BIGINT },
			{ "classPK", Types.BIGINT },
			{ "props", Types.CLOB }
		};
	public static final String TABLE_SQL_CREATE = "create table WebDAVProps (mvccVersion LONG default 0,webDavPropsId LONG not null primary key,companyId LONG,createDate DATE null,modifiedDate DATE null,classNameId LONG,classPK LONG,props TEXT null)";
	public static final String TABLE_SQL_DROP = "drop table WebDAVProps";
	public static final String ORDER_BY_JPQL = " ORDER BY webDAVProps.webDavPropsId ASC";
	public static final String ORDER_BY_SQL = " ORDER BY WebDAVProps.webDavPropsId ASC";
	public static final String DATA_SOURCE = "liferayDataSource";
	public static final String SESSION_FACTORY = "liferaySessionFactory";
	public static final String TX_MANAGER = "liferayTransactionManager";
	public static final boolean ENTITY_CACHE_ENABLED = GetterUtil.getBoolean(com.liferay.portal.util.PropsUtil.get(
				"value.object.entity.cache.enabled.com.liferay.portal.model.WebDAVProps"),
			true);
	public static final boolean FINDER_CACHE_ENABLED = GetterUtil.getBoolean(com.liferay.portal.util.PropsUtil.get(
				"value.object.finder.cache.enabled.com.liferay.portal.model.WebDAVProps"),
			true);
	public static final boolean COLUMN_BITMASK_ENABLED = GetterUtil.getBoolean(com.liferay.portal.util.PropsUtil.get(
				"value.object.column.bitmask.enabled.com.liferay.portal.model.WebDAVProps"),
			true);
	public static final long CLASSNAMEID_COLUMN_BITMASK = 1L;
	public static final long CLASSPK_COLUMN_BITMASK = 2L;
	public static final long WEBDAVPROPSID_COLUMN_BITMASK = 4L;
	public static final long LOCK_EXPIRATION_TIME = GetterUtil.getLong(com.liferay.portal.util.PropsUtil.get(
				"lock.expiration.time.com.liferay.portal.model.WebDAVProps"));

	public WebDAVPropsModelImpl() {
	}

	@Override
	public long getPrimaryKey() {
		return _webDavPropsId;
	}

	@Override
	public void setPrimaryKey(long primaryKey) {
		setWebDavPropsId(primaryKey);
	}

	@Override
	public Serializable getPrimaryKeyObj() {
		return _webDavPropsId;
	}

	@Override
	public void setPrimaryKeyObj(Serializable primaryKeyObj) {
		setPrimaryKey(((Long)primaryKeyObj).longValue());
	}

	@Override
	public Class<?> getModelClass() {
		return WebDAVProps.class;
	}

	@Override
	public String getModelClassName() {
		return WebDAVProps.class.getName();
	}

	@Override
	public Map<String, Object> getModelAttributes() {
		Map<String, Object> attributes = new HashMap<String, Object>();

		attributes.put("mvccVersion", getMvccVersion());
		attributes.put("webDavPropsId", getWebDavPropsId());
		attributes.put("companyId", getCompanyId());
		attributes.put("createDate", getCreateDate());
		attributes.put("modifiedDate", getModifiedDate());
		attributes.put("classNameId", getClassNameId());
		attributes.put("classPK", getClassPK());
		attributes.put("props", getProps());

		attributes.put("entityCacheEnabled", isEntityCacheEnabled());
		attributes.put("finderCacheEnabled", isFinderCacheEnabled());

		return attributes;
	}

	@Override
	public void setModelAttributes(Map<String, Object> attributes) {
		Long mvccVersion = (Long)attributes.get("mvccVersion");

		if (mvccVersion != null) {
			setMvccVersion(mvccVersion);
		}

		Long webDavPropsId = (Long)attributes.get("webDavPropsId");

		if (webDavPropsId != null) {
			setWebDavPropsId(webDavPropsId);
		}

		Long companyId = (Long)attributes.get("companyId");

		if (companyId != null) {
			setCompanyId(companyId);
		}

		Date createDate = (Date)attributes.get("createDate");

		if (createDate != null) {
			setCreateDate(createDate);
		}

		Date modifiedDate = (Date)attributes.get("modifiedDate");

		if (modifiedDate != null) {
			setModifiedDate(modifiedDate);
		}

		Long classNameId = (Long)attributes.get("classNameId");

		if (classNameId != null) {
			setClassNameId(classNameId);
		}

		Long classPK = (Long)attributes.get("classPK");

		if (classPK != null) {
			setClassPK(classPK);
		}

		String props = (String)attributes.get("props");

		if (props != null) {
			setProps(props);
		}
	}

	@Override
	public long getMvccVersion() {
		return _mvccVersion;
	}

	@Override
	public void setMvccVersion(long mvccVersion) {
		_mvccVersion = mvccVersion;
	}

	@Override
	public long getWebDavPropsId() {
		return _webDavPropsId;
	}

	@Override
	public void setWebDavPropsId(long webDavPropsId) {
		_webDavPropsId = webDavPropsId;
	}

	@Override
	public long getCompanyId() {
		return _companyId;
	}

	@Override
	public void setCompanyId(long companyId) {
		_companyId = companyId;
	}

	@Override
	public Date getCreateDate() {
		return _createDate;
	}

	@Override
	public void setCreateDate(Date createDate) {
		_createDate = createDate;
	}

	@Override
	public Date getModifiedDate() {
		return _modifiedDate;
	}

	@Override
	public void setModifiedDate(Date modifiedDate) {
		_modifiedDate = modifiedDate;
	}

	@Override
	public String getClassName() {
		if (getClassNameId() <= 0) {
			return StringPool.BLANK;
		}

		return PortalUtil.getClassName(getClassNameId());
	}

	@Override
	public void setClassName(String className) {
		long classNameId = 0;

		if (Validator.isNotNull(className)) {
			classNameId = PortalUtil.getClassNameId(className);
		}

		setClassNameId(classNameId);
	}

	@Override
	public long getClassNameId() {
		return _classNameId;
	}

	@Override
	public void setClassNameId(long classNameId) {
		_columnBitmask |= CLASSNAMEID_COLUMN_BITMASK;

		if (!_setOriginalClassNameId) {
			_setOriginalClassNameId = true;

			_originalClassNameId = _classNameId;
		}

		_classNameId = classNameId;
	}

	public long getOriginalClassNameId() {
		return _originalClassNameId;
	}

	@Override
	public long getClassPK() {
		return _classPK;
	}

	@Override
	public void setClassPK(long classPK) {
		_columnBitmask |= CLASSPK_COLUMN_BITMASK;

		if (!_setOriginalClassPK) {
			_setOriginalClassPK = true;

			_originalClassPK = _classPK;
		}

		_classPK = classPK;
	}

	public long getOriginalClassPK() {
		return _originalClassPK;
	}

	@Override
	public String getProps() {
		if (_props == null) {
			return StringPool.BLANK;
		}
		else {
			return _props;
		}
	}

	@Override
	public void setProps(String props) {
		_props = props;
	}

	public long getColumnBitmask() {
		return _columnBitmask;
	}

	@Override
	public ExpandoBridge getExpandoBridge() {
		return ExpandoBridgeFactoryUtil.getExpandoBridge(getCompanyId(),
			WebDAVProps.class.getName(), getPrimaryKey());
	}

	@Override
	public void setExpandoBridgeAttributes(ServiceContext serviceContext) {
		ExpandoBridge expandoBridge = getExpandoBridge();

		expandoBridge.setAttributes(serviceContext);
	}

	@Override
	public WebDAVProps toEscapedModel() {
		if (_escapedModel == null) {
			_escapedModel = (WebDAVProps)ProxyUtil.newProxyInstance(_classLoader,
					_escapedModelInterfaces, new AutoEscapeBeanHandler(this));
		}

		return _escapedModel;
	}

	@Override
	public Object clone() {
		WebDAVPropsImpl webDAVPropsImpl = new WebDAVPropsImpl();

		webDAVPropsImpl.setMvccVersion(getMvccVersion());
		webDAVPropsImpl.setWebDavPropsId(getWebDavPropsId());
		webDAVPropsImpl.setCompanyId(getCompanyId());
		webDAVPropsImpl.setCreateDate(getCreateDate());
		webDAVPropsImpl.setModifiedDate(getModifiedDate());
		webDAVPropsImpl.setClassNameId(getClassNameId());
		webDAVPropsImpl.setClassPK(getClassPK());
		webDAVPropsImpl.setProps(getProps());

		webDAVPropsImpl.resetOriginalValues();

		return webDAVPropsImpl;
	}

	@Override
	public int compareTo(WebDAVProps webDAVProps) {
		long primaryKey = webDAVProps.getPrimaryKey();

		if (getPrimaryKey() < primaryKey) {
			return -1;
		}
		else if (getPrimaryKey() > primaryKey) {
			return 1;
		}
		else {
			return 0;
		}
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (!(obj instanceof WebDAVProps)) {
			return false;
		}

		WebDAVProps webDAVProps = (WebDAVProps)obj;

		long primaryKey = webDAVProps.getPrimaryKey();

		if (getPrimaryKey() == primaryKey) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public int hashCode() {
		return (int)getPrimaryKey();
	}

	@Override
	public boolean isEntityCacheEnabled() {
		return ENTITY_CACHE_ENABLED;
	}

	@Override
	public boolean isFinderCacheEnabled() {
		return FINDER_CACHE_ENABLED;
	}

	@Override
	public void resetOriginalValues() {
		WebDAVPropsModelImpl webDAVPropsModelImpl = this;

		webDAVPropsModelImpl._originalClassNameId = webDAVPropsModelImpl._classNameId;

		webDAVPropsModelImpl._setOriginalClassNameId = false;

		webDAVPropsModelImpl._originalClassPK = webDAVPropsModelImpl._classPK;

		webDAVPropsModelImpl._setOriginalClassPK = false;

		webDAVPropsModelImpl._columnBitmask = 0;
	}

	@Override
	public CacheModel<WebDAVProps> toCacheModel() {
		WebDAVPropsCacheModel webDAVPropsCacheModel = new WebDAVPropsCacheModel();

		webDAVPropsCacheModel.mvccVersion = getMvccVersion();

		webDAVPropsCacheModel.webDavPropsId = getWebDavPropsId();

		webDAVPropsCacheModel.companyId = getCompanyId();

		Date createDate = getCreateDate();

		if (createDate != null) {
			webDAVPropsCacheModel.createDate = createDate.getTime();
		}
		else {
			webDAVPropsCacheModel.createDate = Long.MIN_VALUE;
		}

		Date modifiedDate = getModifiedDate();

		if (modifiedDate != null) {
			webDAVPropsCacheModel.modifiedDate = modifiedDate.getTime();
		}
		else {
			webDAVPropsCacheModel.modifiedDate = Long.MIN_VALUE;
		}

		webDAVPropsCacheModel.classNameId = getClassNameId();

		webDAVPropsCacheModel.classPK = getClassPK();

		webDAVPropsCacheModel.props = getProps();

		String props = webDAVPropsCacheModel.props;

		if ((props != null) && (props.length() == 0)) {
			webDAVPropsCacheModel.props = null;
		}

		return webDAVPropsCacheModel;
	}

	@Override
	public String toString() {
		StringBundler sb = new StringBundler(17);

		sb.append("{mvccVersion=");
		sb.append(getMvccVersion());
		sb.append(", webDavPropsId=");
		sb.append(getWebDavPropsId());
		sb.append(", companyId=");
		sb.append(getCompanyId());
		sb.append(", createDate=");
		sb.append(getCreateDate());
		sb.append(", modifiedDate=");
		sb.append(getModifiedDate());
		sb.append(", classNameId=");
		sb.append(getClassNameId());
		sb.append(", classPK=");
		sb.append(getClassPK());
		sb.append(", props=");
		sb.append(getProps());
		sb.append("}");

		return sb.toString();
	}

	@Override
	public String toXmlString() {
		StringBundler sb = new StringBundler(28);

		sb.append("<model><model-name>");
		sb.append("com.liferay.portal.model.WebDAVProps");
		sb.append("</model-name>");

		sb.append(
			"<column><column-name>mvccVersion</column-name><column-value><![CDATA[");
		sb.append(getMvccVersion());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>webDavPropsId</column-name><column-value><![CDATA[");
		sb.append(getWebDavPropsId());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>companyId</column-name><column-value><![CDATA[");
		sb.append(getCompanyId());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>createDate</column-name><column-value><![CDATA[");
		sb.append(getCreateDate());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>modifiedDate</column-name><column-value><![CDATA[");
		sb.append(getModifiedDate());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>classNameId</column-name><column-value><![CDATA[");
		sb.append(getClassNameId());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>classPK</column-name><column-value><![CDATA[");
		sb.append(getClassPK());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>props</column-name><column-value><![CDATA[");
		sb.append(getProps());
		sb.append("]]></column-value></column>");

		sb.append("</model>");

		return sb.toString();
	}

	private static final ClassLoader _classLoader = WebDAVProps.class.getClassLoader();
	private static final Class<?>[] _escapedModelInterfaces = new Class[] {
			WebDAVProps.class
		};
	private long _mvccVersion;
	private long _webDavPropsId;
	private long _companyId;
	private Date _createDate;
	private Date _modifiedDate;
	private long _classNameId;
	private long _originalClassNameId;
	private boolean _setOriginalClassNameId;
	private long _classPK;
	private long _originalClassPK;
	private boolean _setOriginalClassPK;
	private String _props;
	private long _columnBitmask;
	private WebDAVProps _escapedModel;
}