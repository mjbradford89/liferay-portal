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

package com.liferay.portlet.dynamicdatalists.service.base;

import com.liferay.portal.kernel.bean.BeanReference;
import com.liferay.portal.kernel.bean.IdentifiableBean;
import com.liferay.portal.kernel.dao.db.DB;
import com.liferay.portal.kernel.dao.db.DBFactoryUtil;
import com.liferay.portal.kernel.dao.jdbc.SqlUpdate;
import com.liferay.portal.kernel.dao.jdbc.SqlUpdateFactoryUtil;
import com.liferay.portal.kernel.exception.SystemException;
import com.liferay.portal.service.BaseServiceImpl;
import com.liferay.portal.service.persistence.ClassNamePersistence;
import com.liferay.portal.service.persistence.UserFinder;
import com.liferay.portal.service.persistence.UserPersistence;
import com.liferay.portal.service.persistence.WorkflowDefinitionLinkPersistence;
import com.liferay.portal.util.PortalUtil;

import com.liferay.portlet.dynamicdatalists.model.DDLRecordSet;
import com.liferay.portlet.dynamicdatalists.service.DDLRecordSetService;
import com.liferay.portlet.dynamicdatalists.service.persistence.DDLRecordFinder;
import com.liferay.portlet.dynamicdatalists.service.persistence.DDLRecordPersistence;
import com.liferay.portlet.dynamicdatalists.service.persistence.DDLRecordSetFinder;
import com.liferay.portlet.dynamicdatalists.service.persistence.DDLRecordSetPersistence;
import com.liferay.portlet.dynamicdatamapping.service.persistence.DDMStructureFinder;
import com.liferay.portlet.dynamicdatamapping.service.persistence.DDMStructureLinkPersistence;
import com.liferay.portlet.dynamicdatamapping.service.persistence.DDMStructurePersistence;

import javax.sql.DataSource;

/**
 * Provides the base implementation for the d d l record set remote service.
 *
 * <p>
 * This implementation exists only as a container for the default service methods generated by ServiceBuilder. All custom service methods should be put in {@link com.liferay.portlet.dynamicdatalists.service.impl.DDLRecordSetServiceImpl}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see com.liferay.portlet.dynamicdatalists.service.impl.DDLRecordSetServiceImpl
 * @see com.liferay.portlet.dynamicdatalists.service.DDLRecordSetServiceUtil
 * @generated
 */
public abstract class DDLRecordSetServiceBaseImpl extends BaseServiceImpl
	implements DDLRecordSetService, IdentifiableBean {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this class directly. Always use {@link com.liferay.portlet.dynamicdatalists.service.DDLRecordSetServiceUtil} to access the d d l record set remote service.
	 */

	/**
	 * Returns the d d l record set local service.
	 *
	 * @return the d d l record set local service
	 */
	public com.liferay.portlet.dynamicdatalists.service.DDLRecordSetLocalService getDDLRecordSetLocalService() {
		return ddlRecordSetLocalService;
	}

	/**
	 * Sets the d d l record set local service.
	 *
	 * @param ddlRecordSetLocalService the d d l record set local service
	 */
	public void setDDLRecordSetLocalService(
		com.liferay.portlet.dynamicdatalists.service.DDLRecordSetLocalService ddlRecordSetLocalService) {
		this.ddlRecordSetLocalService = ddlRecordSetLocalService;
	}

	/**
	 * Returns the d d l record set remote service.
	 *
	 * @return the d d l record set remote service
	 */
	public com.liferay.portlet.dynamicdatalists.service.DDLRecordSetService getDDLRecordSetService() {
		return ddlRecordSetService;
	}

	/**
	 * Sets the d d l record set remote service.
	 *
	 * @param ddlRecordSetService the d d l record set remote service
	 */
	public void setDDLRecordSetService(
		com.liferay.portlet.dynamicdatalists.service.DDLRecordSetService ddlRecordSetService) {
		this.ddlRecordSetService = ddlRecordSetService;
	}

	/**
	 * Returns the d d l record set persistence.
	 *
	 * @return the d d l record set persistence
	 */
	public DDLRecordSetPersistence getDDLRecordSetPersistence() {
		return ddlRecordSetPersistence;
	}

	/**
	 * Sets the d d l record set persistence.
	 *
	 * @param ddlRecordSetPersistence the d d l record set persistence
	 */
	public void setDDLRecordSetPersistence(
		DDLRecordSetPersistence ddlRecordSetPersistence) {
		this.ddlRecordSetPersistence = ddlRecordSetPersistence;
	}

	/**
	 * Returns the d d l record set finder.
	 *
	 * @return the d d l record set finder
	 */
	public DDLRecordSetFinder getDDLRecordSetFinder() {
		return ddlRecordSetFinder;
	}

	/**
	 * Sets the d d l record set finder.
	 *
	 * @param ddlRecordSetFinder the d d l record set finder
	 */
	public void setDDLRecordSetFinder(DDLRecordSetFinder ddlRecordSetFinder) {
		this.ddlRecordSetFinder = ddlRecordSetFinder;
	}

	/**
	 * Returns the counter local service.
	 *
	 * @return the counter local service
	 */
	public com.liferay.counter.service.CounterLocalService getCounterLocalService() {
		return counterLocalService;
	}

	/**
	 * Sets the counter local service.
	 *
	 * @param counterLocalService the counter local service
	 */
	public void setCounterLocalService(
		com.liferay.counter.service.CounterLocalService counterLocalService) {
		this.counterLocalService = counterLocalService;
	}

	/**
	 * Returns the class name local service.
	 *
	 * @return the class name local service
	 */
	public com.liferay.portal.service.ClassNameLocalService getClassNameLocalService() {
		return classNameLocalService;
	}

	/**
	 * Sets the class name local service.
	 *
	 * @param classNameLocalService the class name local service
	 */
	public void setClassNameLocalService(
		com.liferay.portal.service.ClassNameLocalService classNameLocalService) {
		this.classNameLocalService = classNameLocalService;
	}

	/**
	 * Returns the class name remote service.
	 *
	 * @return the class name remote service
	 */
	public com.liferay.portal.service.ClassNameService getClassNameService() {
		return classNameService;
	}

	/**
	 * Sets the class name remote service.
	 *
	 * @param classNameService the class name remote service
	 */
	public void setClassNameService(
		com.liferay.portal.service.ClassNameService classNameService) {
		this.classNameService = classNameService;
	}

	/**
	 * Returns the class name persistence.
	 *
	 * @return the class name persistence
	 */
	public ClassNamePersistence getClassNamePersistence() {
		return classNamePersistence;
	}

	/**
	 * Sets the class name persistence.
	 *
	 * @param classNamePersistence the class name persistence
	 */
	public void setClassNamePersistence(
		ClassNamePersistence classNamePersistence) {
		this.classNamePersistence = classNamePersistence;
	}

	/**
	 * Returns the resource local service.
	 *
	 * @return the resource local service
	 */
	public com.liferay.portal.service.ResourceLocalService getResourceLocalService() {
		return resourceLocalService;
	}

	/**
	 * Sets the resource local service.
	 *
	 * @param resourceLocalService the resource local service
	 */
	public void setResourceLocalService(
		com.liferay.portal.service.ResourceLocalService resourceLocalService) {
		this.resourceLocalService = resourceLocalService;
	}

	/**
	 * Returns the user local service.
	 *
	 * @return the user local service
	 */
	public com.liferay.portal.service.UserLocalService getUserLocalService() {
		return userLocalService;
	}

	/**
	 * Sets the user local service.
	 *
	 * @param userLocalService the user local service
	 */
	public void setUserLocalService(
		com.liferay.portal.service.UserLocalService userLocalService) {
		this.userLocalService = userLocalService;
	}

	/**
	 * Returns the user remote service.
	 *
	 * @return the user remote service
	 */
	public com.liferay.portal.service.UserService getUserService() {
		return userService;
	}

	/**
	 * Sets the user remote service.
	 *
	 * @param userService the user remote service
	 */
	public void setUserService(
		com.liferay.portal.service.UserService userService) {
		this.userService = userService;
	}

	/**
	 * Returns the user persistence.
	 *
	 * @return the user persistence
	 */
	public UserPersistence getUserPersistence() {
		return userPersistence;
	}

	/**
	 * Sets the user persistence.
	 *
	 * @param userPersistence the user persistence
	 */
	public void setUserPersistence(UserPersistence userPersistence) {
		this.userPersistence = userPersistence;
	}

	/**
	 * Returns the user finder.
	 *
	 * @return the user finder
	 */
	public UserFinder getUserFinder() {
		return userFinder;
	}

	/**
	 * Sets the user finder.
	 *
	 * @param userFinder the user finder
	 */
	public void setUserFinder(UserFinder userFinder) {
		this.userFinder = userFinder;
	}

	/**
	 * Returns the workflow definition link local service.
	 *
	 * @return the workflow definition link local service
	 */
	public com.liferay.portal.service.WorkflowDefinitionLinkLocalService getWorkflowDefinitionLinkLocalService() {
		return workflowDefinitionLinkLocalService;
	}

	/**
	 * Sets the workflow definition link local service.
	 *
	 * @param workflowDefinitionLinkLocalService the workflow definition link local service
	 */
	public void setWorkflowDefinitionLinkLocalService(
		com.liferay.portal.service.WorkflowDefinitionLinkLocalService workflowDefinitionLinkLocalService) {
		this.workflowDefinitionLinkLocalService = workflowDefinitionLinkLocalService;
	}

	/**
	 * Returns the workflow definition link persistence.
	 *
	 * @return the workflow definition link persistence
	 */
	public WorkflowDefinitionLinkPersistence getWorkflowDefinitionLinkPersistence() {
		return workflowDefinitionLinkPersistence;
	}

	/**
	 * Sets the workflow definition link persistence.
	 *
	 * @param workflowDefinitionLinkPersistence the workflow definition link persistence
	 */
	public void setWorkflowDefinitionLinkPersistence(
		WorkflowDefinitionLinkPersistence workflowDefinitionLinkPersistence) {
		this.workflowDefinitionLinkPersistence = workflowDefinitionLinkPersistence;
	}

	/**
	 * Returns the d d l record local service.
	 *
	 * @return the d d l record local service
	 */
	public com.liferay.portlet.dynamicdatalists.service.DDLRecordLocalService getDDLRecordLocalService() {
		return ddlRecordLocalService;
	}

	/**
	 * Sets the d d l record local service.
	 *
	 * @param ddlRecordLocalService the d d l record local service
	 */
	public void setDDLRecordLocalService(
		com.liferay.portlet.dynamicdatalists.service.DDLRecordLocalService ddlRecordLocalService) {
		this.ddlRecordLocalService = ddlRecordLocalService;
	}

	/**
	 * Returns the d d l record remote service.
	 *
	 * @return the d d l record remote service
	 */
	public com.liferay.portlet.dynamicdatalists.service.DDLRecordService getDDLRecordService() {
		return ddlRecordService;
	}

	/**
	 * Sets the d d l record remote service.
	 *
	 * @param ddlRecordService the d d l record remote service
	 */
	public void setDDLRecordService(
		com.liferay.portlet.dynamicdatalists.service.DDLRecordService ddlRecordService) {
		this.ddlRecordService = ddlRecordService;
	}

	/**
	 * Returns the d d l record persistence.
	 *
	 * @return the d d l record persistence
	 */
	public DDLRecordPersistence getDDLRecordPersistence() {
		return ddlRecordPersistence;
	}

	/**
	 * Sets the d d l record persistence.
	 *
	 * @param ddlRecordPersistence the d d l record persistence
	 */
	public void setDDLRecordPersistence(
		DDLRecordPersistence ddlRecordPersistence) {
		this.ddlRecordPersistence = ddlRecordPersistence;
	}

	/**
	 * Returns the d d l record finder.
	 *
	 * @return the d d l record finder
	 */
	public DDLRecordFinder getDDLRecordFinder() {
		return ddlRecordFinder;
	}

	/**
	 * Sets the d d l record finder.
	 *
	 * @param ddlRecordFinder the d d l record finder
	 */
	public void setDDLRecordFinder(DDLRecordFinder ddlRecordFinder) {
		this.ddlRecordFinder = ddlRecordFinder;
	}

	/**
	 * Returns the d d m structure local service.
	 *
	 * @return the d d m structure local service
	 */
	public com.liferay.portlet.dynamicdatamapping.service.DDMStructureLocalService getDDMStructureLocalService() {
		return ddmStructureLocalService;
	}

	/**
	 * Sets the d d m structure local service.
	 *
	 * @param ddmStructureLocalService the d d m structure local service
	 */
	public void setDDMStructureLocalService(
		com.liferay.portlet.dynamicdatamapping.service.DDMStructureLocalService ddmStructureLocalService) {
		this.ddmStructureLocalService = ddmStructureLocalService;
	}

	/**
	 * Returns the d d m structure remote service.
	 *
	 * @return the d d m structure remote service
	 */
	public com.liferay.portlet.dynamicdatamapping.service.DDMStructureService getDDMStructureService() {
		return ddmStructureService;
	}

	/**
	 * Sets the d d m structure remote service.
	 *
	 * @param ddmStructureService the d d m structure remote service
	 */
	public void setDDMStructureService(
		com.liferay.portlet.dynamicdatamapping.service.DDMStructureService ddmStructureService) {
		this.ddmStructureService = ddmStructureService;
	}

	/**
	 * Returns the d d m structure persistence.
	 *
	 * @return the d d m structure persistence
	 */
	public DDMStructurePersistence getDDMStructurePersistence() {
		return ddmStructurePersistence;
	}

	/**
	 * Sets the d d m structure persistence.
	 *
	 * @param ddmStructurePersistence the d d m structure persistence
	 */
	public void setDDMStructurePersistence(
		DDMStructurePersistence ddmStructurePersistence) {
		this.ddmStructurePersistence = ddmStructurePersistence;
	}

	/**
	 * Returns the d d m structure finder.
	 *
	 * @return the d d m structure finder
	 */
	public DDMStructureFinder getDDMStructureFinder() {
		return ddmStructureFinder;
	}

	/**
	 * Sets the d d m structure finder.
	 *
	 * @param ddmStructureFinder the d d m structure finder
	 */
	public void setDDMStructureFinder(DDMStructureFinder ddmStructureFinder) {
		this.ddmStructureFinder = ddmStructureFinder;
	}

	/**
	 * Returns the d d m structure link local service.
	 *
	 * @return the d d m structure link local service
	 */
	public com.liferay.portlet.dynamicdatamapping.service.DDMStructureLinkLocalService getDDMStructureLinkLocalService() {
		return ddmStructureLinkLocalService;
	}

	/**
	 * Sets the d d m structure link local service.
	 *
	 * @param ddmStructureLinkLocalService the d d m structure link local service
	 */
	public void setDDMStructureLinkLocalService(
		com.liferay.portlet.dynamicdatamapping.service.DDMStructureLinkLocalService ddmStructureLinkLocalService) {
		this.ddmStructureLinkLocalService = ddmStructureLinkLocalService;
	}

	/**
	 * Returns the d d m structure link persistence.
	 *
	 * @return the d d m structure link persistence
	 */
	public DDMStructureLinkPersistence getDDMStructureLinkPersistence() {
		return ddmStructureLinkPersistence;
	}

	/**
	 * Sets the d d m structure link persistence.
	 *
	 * @param ddmStructureLinkPersistence the d d m structure link persistence
	 */
	public void setDDMStructureLinkPersistence(
		DDMStructureLinkPersistence ddmStructureLinkPersistence) {
		this.ddmStructureLinkPersistence = ddmStructureLinkPersistence;
	}

	public void afterPropertiesSet() {
	}

	public void destroy() {
	}

	/**
	 * Returns the Spring bean ID for this bean.
	 *
	 * @return the Spring bean ID for this bean
	 */
	@Override
	public String getBeanIdentifier() {
		return _beanIdentifier;
	}

	/**
	 * Sets the Spring bean ID for this bean.
	 *
	 * @param beanIdentifier the Spring bean ID for this bean
	 */
	@Override
	public void setBeanIdentifier(String beanIdentifier) {
		_beanIdentifier = beanIdentifier;
	}

	protected Class<?> getModelClass() {
		return DDLRecordSet.class;
	}

	protected String getModelClassName() {
		return DDLRecordSet.class.getName();
	}

	/**
	 * Performs a SQL query.
	 *
	 * @param sql the sql query
	 */
	protected void runSQL(String sql) {
		try {
			DataSource dataSource = ddlRecordSetPersistence.getDataSource();

			DB db = DBFactoryUtil.getDB();

			sql = db.buildSQL(sql);
			sql = PortalUtil.transformSQL(sql);

			SqlUpdate sqlUpdate = SqlUpdateFactoryUtil.getSqlUpdate(dataSource,
					sql, new int[0]);

			sqlUpdate.update();
		}
		catch (Exception e) {
			throw new SystemException(e);
		}
	}

	@BeanReference(type = com.liferay.portlet.dynamicdatalists.service.DDLRecordSetLocalService.class)
	protected com.liferay.portlet.dynamicdatalists.service.DDLRecordSetLocalService ddlRecordSetLocalService;
	@BeanReference(type = com.liferay.portlet.dynamicdatalists.service.DDLRecordSetService.class)
	protected com.liferay.portlet.dynamicdatalists.service.DDLRecordSetService ddlRecordSetService;
	@BeanReference(type = DDLRecordSetPersistence.class)
	protected DDLRecordSetPersistence ddlRecordSetPersistence;
	@BeanReference(type = DDLRecordSetFinder.class)
	protected DDLRecordSetFinder ddlRecordSetFinder;
	@BeanReference(type = com.liferay.counter.service.CounterLocalService.class)
	protected com.liferay.counter.service.CounterLocalService counterLocalService;
	@BeanReference(type = com.liferay.portal.service.ClassNameLocalService.class)
	protected com.liferay.portal.service.ClassNameLocalService classNameLocalService;
	@BeanReference(type = com.liferay.portal.service.ClassNameService.class)
	protected com.liferay.portal.service.ClassNameService classNameService;
	@BeanReference(type = ClassNamePersistence.class)
	protected ClassNamePersistence classNamePersistence;
	@BeanReference(type = com.liferay.portal.service.ResourceLocalService.class)
	protected com.liferay.portal.service.ResourceLocalService resourceLocalService;
	@BeanReference(type = com.liferay.portal.service.UserLocalService.class)
	protected com.liferay.portal.service.UserLocalService userLocalService;
	@BeanReference(type = com.liferay.portal.service.UserService.class)
	protected com.liferay.portal.service.UserService userService;
	@BeanReference(type = UserPersistence.class)
	protected UserPersistence userPersistence;
	@BeanReference(type = UserFinder.class)
	protected UserFinder userFinder;
	@BeanReference(type = com.liferay.portal.service.WorkflowDefinitionLinkLocalService.class)
	protected com.liferay.portal.service.WorkflowDefinitionLinkLocalService workflowDefinitionLinkLocalService;
	@BeanReference(type = WorkflowDefinitionLinkPersistence.class)
	protected WorkflowDefinitionLinkPersistence workflowDefinitionLinkPersistence;
	@BeanReference(type = com.liferay.portlet.dynamicdatalists.service.DDLRecordLocalService.class)
	protected com.liferay.portlet.dynamicdatalists.service.DDLRecordLocalService ddlRecordLocalService;
	@BeanReference(type = com.liferay.portlet.dynamicdatalists.service.DDLRecordService.class)
	protected com.liferay.portlet.dynamicdatalists.service.DDLRecordService ddlRecordService;
	@BeanReference(type = DDLRecordPersistence.class)
	protected DDLRecordPersistence ddlRecordPersistence;
	@BeanReference(type = DDLRecordFinder.class)
	protected DDLRecordFinder ddlRecordFinder;
	@BeanReference(type = com.liferay.portlet.dynamicdatamapping.service.DDMStructureLocalService.class)
	protected com.liferay.portlet.dynamicdatamapping.service.DDMStructureLocalService ddmStructureLocalService;
	@BeanReference(type = com.liferay.portlet.dynamicdatamapping.service.DDMStructureService.class)
	protected com.liferay.portlet.dynamicdatamapping.service.DDMStructureService ddmStructureService;
	@BeanReference(type = DDMStructurePersistence.class)
	protected DDMStructurePersistence ddmStructurePersistence;
	@BeanReference(type = DDMStructureFinder.class)
	protected DDMStructureFinder ddmStructureFinder;
	@BeanReference(type = com.liferay.portlet.dynamicdatamapping.service.DDMStructureLinkLocalService.class)
	protected com.liferay.portlet.dynamicdatamapping.service.DDMStructureLinkLocalService ddmStructureLinkLocalService;
	@BeanReference(type = DDMStructureLinkPersistence.class)
	protected DDMStructureLinkPersistence ddmStructureLinkPersistence;
	private String _beanIdentifier;
}