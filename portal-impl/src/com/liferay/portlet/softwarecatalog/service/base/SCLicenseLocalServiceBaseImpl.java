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

package com.liferay.portlet.softwarecatalog.service.base;

import aQute.bnd.annotation.ProviderType;

import com.liferay.portal.kernel.bean.BeanReference;
import com.liferay.portal.kernel.dao.db.DB;
import com.liferay.portal.kernel.dao.db.DBFactoryUtil;
import com.liferay.portal.kernel.dao.jdbc.SqlUpdate;
import com.liferay.portal.kernel.dao.jdbc.SqlUpdateFactoryUtil;
import com.liferay.portal.kernel.dao.orm.ActionableDynamicQuery;
import com.liferay.portal.kernel.dao.orm.DefaultActionableDynamicQuery;
import com.liferay.portal.kernel.dao.orm.DynamicQuery;
import com.liferay.portal.kernel.dao.orm.DynamicQueryFactoryUtil;
import com.liferay.portal.kernel.dao.orm.Projection;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.exception.SystemException;
import com.liferay.portal.kernel.module.framework.service.IdentifiableOSGiService;
import com.liferay.portal.kernel.search.Indexable;
import com.liferay.portal.kernel.search.IndexableType;
import com.liferay.portal.kernel.util.OrderByComparator;
import com.liferay.portal.model.PersistedModel;
import com.liferay.portal.service.BaseLocalServiceImpl;
import com.liferay.portal.service.PersistedModelLocalServiceRegistry;
import com.liferay.portal.util.PortalUtil;

import com.liferay.portlet.softwarecatalog.model.SCLicense;
import com.liferay.portlet.softwarecatalog.service.SCLicenseLocalService;
import com.liferay.portlet.softwarecatalog.service.persistence.SCLicensePersistence;
import com.liferay.portlet.softwarecatalog.service.persistence.SCProductEntryPersistence;

import java.io.Serializable;

import java.util.List;

import javax.sql.DataSource;

/**
 * Provides the base implementation for the s c license local service.
 *
 * <p>
 * This implementation exists only as a container for the default service methods generated by ServiceBuilder. All custom service methods should be put in {@link com.liferay.portlet.softwarecatalog.service.impl.SCLicenseLocalServiceImpl}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see com.liferay.portlet.softwarecatalog.service.impl.SCLicenseLocalServiceImpl
 * @see com.liferay.portlet.softwarecatalog.service.SCLicenseLocalServiceUtil
 * @generated
 */
@ProviderType
public abstract class SCLicenseLocalServiceBaseImpl extends BaseLocalServiceImpl
	implements SCLicenseLocalService, IdentifiableOSGiService {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this class directly. Always use {@link com.liferay.portlet.softwarecatalog.service.SCLicenseLocalServiceUtil} to access the s c license local service.
	 */

	/**
	 * Adds the s c license to the database. Also notifies the appropriate model listeners.
	 *
	 * @param scLicense the s c license
	 * @return the s c license that was added
	 */
	@Indexable(type = IndexableType.REINDEX)
	@Override
	public SCLicense addSCLicense(SCLicense scLicense) {
		scLicense.setNew(true);

		return scLicensePersistence.update(scLicense);
	}

	/**
	 * Creates a new s c license with the primary key. Does not add the s c license to the database.
	 *
	 * @param licenseId the primary key for the new s c license
	 * @return the new s c license
	 */
	@Override
	public SCLicense createSCLicense(long licenseId) {
		return scLicensePersistence.create(licenseId);
	}

	/**
	 * Deletes the s c license with the primary key from the database. Also notifies the appropriate model listeners.
	 *
	 * @param licenseId the primary key of the s c license
	 * @return the s c license that was removed
	 * @throws PortalException if a s c license with the primary key could not be found
	 */
	@Indexable(type = IndexableType.DELETE)
	@Override
	public SCLicense deleteSCLicense(long licenseId) throws PortalException {
		return scLicensePersistence.remove(licenseId);
	}

	/**
	 * Deletes the s c license from the database. Also notifies the appropriate model listeners.
	 *
	 * @param scLicense the s c license
	 * @return the s c license that was removed
	 */
	@Indexable(type = IndexableType.DELETE)
	@Override
	public SCLicense deleteSCLicense(SCLicense scLicense) {
		return scLicensePersistence.remove(scLicense);
	}

	@Override
	public DynamicQuery dynamicQuery() {
		Class<?> clazz = getClass();

		return DynamicQueryFactoryUtil.forClass(SCLicense.class,
			clazz.getClassLoader());
	}

	/**
	 * Performs a dynamic query on the database and returns the matching rows.
	 *
	 * @param dynamicQuery the dynamic query
	 * @return the matching rows
	 */
	@Override
	public <T> List<T> dynamicQuery(DynamicQuery dynamicQuery) {
		return scLicensePersistence.findWithDynamicQuery(dynamicQuery);
	}

	/**
	 * Performs a dynamic query on the database and returns a range of the matching rows.
	 *
	 * <p>
	 * Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.portlet.softwarecatalog.model.impl.SCLicenseModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	 * </p>
	 *
	 * @param dynamicQuery the dynamic query
	 * @param start the lower bound of the range of model instances
	 * @param end the upper bound of the range of model instances (not inclusive)
	 * @return the range of matching rows
	 */
	@Override
	public <T> List<T> dynamicQuery(DynamicQuery dynamicQuery, int start,
		int end) {
		return scLicensePersistence.findWithDynamicQuery(dynamicQuery, start,
			end);
	}

	/**
	 * Performs a dynamic query on the database and returns an ordered range of the matching rows.
	 *
	 * <p>
	 * Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.portlet.softwarecatalog.model.impl.SCLicenseModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	 * </p>
	 *
	 * @param dynamicQuery the dynamic query
	 * @param start the lower bound of the range of model instances
	 * @param end the upper bound of the range of model instances (not inclusive)
	 * @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	 * @return the ordered range of matching rows
	 */
	@Override
	public <T> List<T> dynamicQuery(DynamicQuery dynamicQuery, int start,
		int end, OrderByComparator<T> orderByComparator) {
		return scLicensePersistence.findWithDynamicQuery(dynamicQuery, start,
			end, orderByComparator);
	}

	/**
	 * Returns the number of rows matching the dynamic query.
	 *
	 * @param dynamicQuery the dynamic query
	 * @return the number of rows matching the dynamic query
	 */
	@Override
	public long dynamicQueryCount(DynamicQuery dynamicQuery) {
		return scLicensePersistence.countWithDynamicQuery(dynamicQuery);
	}

	/**
	 * Returns the number of rows matching the dynamic query.
	 *
	 * @param dynamicQuery the dynamic query
	 * @param projection the projection to apply to the query
	 * @return the number of rows matching the dynamic query
	 */
	@Override
	public long dynamicQueryCount(DynamicQuery dynamicQuery,
		Projection projection) {
		return scLicensePersistence.countWithDynamicQuery(dynamicQuery,
			projection);
	}

	@Override
	public SCLicense fetchSCLicense(long licenseId) {
		return scLicensePersistence.fetchByPrimaryKey(licenseId);
	}

	/**
	 * Returns the s c license with the primary key.
	 *
	 * @param licenseId the primary key of the s c license
	 * @return the s c license
	 * @throws PortalException if a s c license with the primary key could not be found
	 */
	@Override
	public SCLicense getSCLicense(long licenseId) throws PortalException {
		return scLicensePersistence.findByPrimaryKey(licenseId);
	}

	@Override
	public ActionableDynamicQuery getActionableDynamicQuery() {
		ActionableDynamicQuery actionableDynamicQuery = new DefaultActionableDynamicQuery();

		actionableDynamicQuery.setBaseLocalService(com.liferay.portlet.softwarecatalog.service.SCLicenseLocalServiceUtil.getService());
		actionableDynamicQuery.setClass(SCLicense.class);
		actionableDynamicQuery.setClassLoader(getClassLoader());

		actionableDynamicQuery.setPrimaryKeyPropertyName("licenseId");

		return actionableDynamicQuery;
	}

	protected void initActionableDynamicQuery(
		ActionableDynamicQuery actionableDynamicQuery) {
		actionableDynamicQuery.setBaseLocalService(com.liferay.portlet.softwarecatalog.service.SCLicenseLocalServiceUtil.getService());
		actionableDynamicQuery.setClass(SCLicense.class);
		actionableDynamicQuery.setClassLoader(getClassLoader());

		actionableDynamicQuery.setPrimaryKeyPropertyName("licenseId");
	}

	/**
	 * @throws PortalException
	 */
	@Override
	public PersistedModel deletePersistedModel(PersistedModel persistedModel)
		throws PortalException {
		return scLicenseLocalService.deleteSCLicense((SCLicense)persistedModel);
	}

	@Override
	public PersistedModel getPersistedModel(Serializable primaryKeyObj)
		throws PortalException {
		return scLicensePersistence.findByPrimaryKey(primaryKeyObj);
	}

	/**
	 * Returns a range of all the s c licenses.
	 *
	 * <p>
	 * Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.portlet.softwarecatalog.model.impl.SCLicenseModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	 * </p>
	 *
	 * @param start the lower bound of the range of s c licenses
	 * @param end the upper bound of the range of s c licenses (not inclusive)
	 * @return the range of s c licenses
	 */
	@Override
	public List<SCLicense> getSCLicenses(int start, int end) {
		return scLicensePersistence.findAll(start, end);
	}

	/**
	 * Returns the number of s c licenses.
	 *
	 * @return the number of s c licenses
	 */
	@Override
	public int getSCLicensesCount() {
		return scLicensePersistence.countAll();
	}

	/**
	 * Updates the s c license in the database or adds it if it does not yet exist. Also notifies the appropriate model listeners.
	 *
	 * @param scLicense the s c license
	 * @return the s c license that was updated
	 */
	@Indexable(type = IndexableType.REINDEX)
	@Override
	public SCLicense updateSCLicense(SCLicense scLicense) {
		return scLicensePersistence.update(scLicense);
	}

	/**
	 */
	@Override
	public void addSCProductEntrySCLicense(long productEntryId, long licenseId) {
		scProductEntryPersistence.addSCLicense(productEntryId, licenseId);
	}

	/**
	 */
	@Override
	public void addSCProductEntrySCLicense(long productEntryId,
		SCLicense scLicense) {
		scProductEntryPersistence.addSCLicense(productEntryId, scLicense);
	}

	/**
	 */
	@Override
	public void addSCProductEntrySCLicenses(long productEntryId,
		long[] licenseIds) {
		scProductEntryPersistence.addSCLicenses(productEntryId, licenseIds);
	}

	/**
	 */
	@Override
	public void addSCProductEntrySCLicenses(long productEntryId,
		List<SCLicense> SCLicenses) {
		scProductEntryPersistence.addSCLicenses(productEntryId, SCLicenses);
	}

	/**
	 */
	@Override
	public void clearSCProductEntrySCLicenses(long productEntryId) {
		scProductEntryPersistence.clearSCLicenses(productEntryId);
	}

	/**
	 */
	@Override
	public void deleteSCProductEntrySCLicense(long productEntryId,
		long licenseId) {
		scProductEntryPersistence.removeSCLicense(productEntryId, licenseId);
	}

	/**
	 */
	@Override
	public void deleteSCProductEntrySCLicense(long productEntryId,
		SCLicense scLicense) {
		scProductEntryPersistence.removeSCLicense(productEntryId, scLicense);
	}

	/**
	 */
	@Override
	public void deleteSCProductEntrySCLicenses(long productEntryId,
		long[] licenseIds) {
		scProductEntryPersistence.removeSCLicenses(productEntryId, licenseIds);
	}

	/**
	 */
	@Override
	public void deleteSCProductEntrySCLicenses(long productEntryId,
		List<SCLicense> SCLicenses) {
		scProductEntryPersistence.removeSCLicenses(productEntryId, SCLicenses);
	}

	/**
	 * Returns the productEntryIds of the s c product entries associated with the s c license.
	 *
	 * @param licenseId the licenseId of the s c license
	 * @return long[] the productEntryIds of s c product entries associated with the s c license
	 */
	@Override
	public long[] getSCProductEntryPrimaryKeys(long licenseId) {
		return scLicensePersistence.getSCProductEntryPrimaryKeys(licenseId);
	}

	/**
	 */
	@Override
	public List<SCLicense> getSCProductEntrySCLicenses(long productEntryId) {
		return scProductEntryPersistence.getSCLicenses(productEntryId);
	}

	/**
	 */
	@Override
	public List<SCLicense> getSCProductEntrySCLicenses(long productEntryId,
		int start, int end) {
		return scProductEntryPersistence.getSCLicenses(productEntryId, start,
			end);
	}

	/**
	 */
	@Override
	public List<SCLicense> getSCProductEntrySCLicenses(long productEntryId,
		int start, int end, OrderByComparator<SCLicense> orderByComparator) {
		return scProductEntryPersistence.getSCLicenses(productEntryId, start,
			end, orderByComparator);
	}

	/**
	 */
	@Override
	public int getSCProductEntrySCLicensesCount(long productEntryId) {
		return scProductEntryPersistence.getSCLicensesSize(productEntryId);
	}

	/**
	 */
	@Override
	public boolean hasSCProductEntrySCLicense(long productEntryId,
		long licenseId) {
		return scProductEntryPersistence.containsSCLicense(productEntryId,
			licenseId);
	}

	/**
	 */
	@Override
	public boolean hasSCProductEntrySCLicenses(long productEntryId) {
		return scProductEntryPersistence.containsSCLicenses(productEntryId);
	}

	/**
	 */
	@Override
	public void setSCProductEntrySCLicenses(long productEntryId,
		long[] licenseIds) {
		scProductEntryPersistence.setSCLicenses(productEntryId, licenseIds);
	}

	/**
	 * Returns the s c license local service.
	 *
	 * @return the s c license local service
	 */
	public SCLicenseLocalService getSCLicenseLocalService() {
		return scLicenseLocalService;
	}

	/**
	 * Sets the s c license local service.
	 *
	 * @param scLicenseLocalService the s c license local service
	 */
	public void setSCLicenseLocalService(
		SCLicenseLocalService scLicenseLocalService) {
		this.scLicenseLocalService = scLicenseLocalService;
	}

	/**
	 * Returns the s c license remote service.
	 *
	 * @return the s c license remote service
	 */
	public com.liferay.portlet.softwarecatalog.service.SCLicenseService getSCLicenseService() {
		return scLicenseService;
	}

	/**
	 * Sets the s c license remote service.
	 *
	 * @param scLicenseService the s c license remote service
	 */
	public void setSCLicenseService(
		com.liferay.portlet.softwarecatalog.service.SCLicenseService scLicenseService) {
		this.scLicenseService = scLicenseService;
	}

	/**
	 * Returns the s c license persistence.
	 *
	 * @return the s c license persistence
	 */
	public SCLicensePersistence getSCLicensePersistence() {
		return scLicensePersistence;
	}

	/**
	 * Sets the s c license persistence.
	 *
	 * @param scLicensePersistence the s c license persistence
	 */
	public void setSCLicensePersistence(
		SCLicensePersistence scLicensePersistence) {
		this.scLicensePersistence = scLicensePersistence;
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
	 * Returns the s c product entry local service.
	 *
	 * @return the s c product entry local service
	 */
	public com.liferay.portlet.softwarecatalog.service.SCProductEntryLocalService getSCProductEntryLocalService() {
		return scProductEntryLocalService;
	}

	/**
	 * Sets the s c product entry local service.
	 *
	 * @param scProductEntryLocalService the s c product entry local service
	 */
	public void setSCProductEntryLocalService(
		com.liferay.portlet.softwarecatalog.service.SCProductEntryLocalService scProductEntryLocalService) {
		this.scProductEntryLocalService = scProductEntryLocalService;
	}

	/**
	 * Returns the s c product entry remote service.
	 *
	 * @return the s c product entry remote service
	 */
	public com.liferay.portlet.softwarecatalog.service.SCProductEntryService getSCProductEntryService() {
		return scProductEntryService;
	}

	/**
	 * Sets the s c product entry remote service.
	 *
	 * @param scProductEntryService the s c product entry remote service
	 */
	public void setSCProductEntryService(
		com.liferay.portlet.softwarecatalog.service.SCProductEntryService scProductEntryService) {
		this.scProductEntryService = scProductEntryService;
	}

	/**
	 * Returns the s c product entry persistence.
	 *
	 * @return the s c product entry persistence
	 */
	public SCProductEntryPersistence getSCProductEntryPersistence() {
		return scProductEntryPersistence;
	}

	/**
	 * Sets the s c product entry persistence.
	 *
	 * @param scProductEntryPersistence the s c product entry persistence
	 */
	public void setSCProductEntryPersistence(
		SCProductEntryPersistence scProductEntryPersistence) {
		this.scProductEntryPersistence = scProductEntryPersistence;
	}

	public void afterPropertiesSet() {
		persistedModelLocalServiceRegistry.register("com.liferay.portlet.softwarecatalog.model.SCLicense",
			scLicenseLocalService);
	}

	public void destroy() {
		persistedModelLocalServiceRegistry.unregister(
			"com.liferay.portlet.softwarecatalog.model.SCLicense");
	}

	/**
	 * Returns the OSGi service identifier.
	 *
	 * @return the OSGi service identifier
	 */
	@Override
	public String getOSGiServiceIdentifier() {
		return SCLicenseLocalService.class.getName();
	}

	protected Class<?> getModelClass() {
		return SCLicense.class;
	}

	protected String getModelClassName() {
		return SCLicense.class.getName();
	}

	/**
	 * Performs a SQL query.
	 *
	 * @param sql the sql query
	 */
	protected void runSQL(String sql) {
		try {
			DataSource dataSource = scLicensePersistence.getDataSource();

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

	@BeanReference(type = com.liferay.portlet.softwarecatalog.service.SCLicenseLocalService.class)
	protected SCLicenseLocalService scLicenseLocalService;
	@BeanReference(type = com.liferay.portlet.softwarecatalog.service.SCLicenseService.class)
	protected com.liferay.portlet.softwarecatalog.service.SCLicenseService scLicenseService;
	@BeanReference(type = SCLicensePersistence.class)
	protected SCLicensePersistence scLicensePersistence;
	@BeanReference(type = com.liferay.counter.service.CounterLocalService.class)
	protected com.liferay.counter.service.CounterLocalService counterLocalService;
	@BeanReference(type = com.liferay.portlet.softwarecatalog.service.SCProductEntryLocalService.class)
	protected com.liferay.portlet.softwarecatalog.service.SCProductEntryLocalService scProductEntryLocalService;
	@BeanReference(type = com.liferay.portlet.softwarecatalog.service.SCProductEntryService.class)
	protected com.liferay.portlet.softwarecatalog.service.SCProductEntryService scProductEntryService;
	@BeanReference(type = SCProductEntryPersistence.class)
	protected SCProductEntryPersistence scProductEntryPersistence;
	@BeanReference(type = PersistedModelLocalServiceRegistry.class)
	protected PersistedModelLocalServiceRegistry persistedModelLocalServiceRegistry;
}