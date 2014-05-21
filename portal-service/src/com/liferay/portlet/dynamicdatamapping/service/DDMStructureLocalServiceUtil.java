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

package com.liferay.portlet.dynamicdatamapping.service;

import aQute.bnd.annotation.ProviderType;

import com.liferay.portal.kernel.bean.PortalBeanLocatorUtil;
import com.liferay.portal.kernel.util.ReferenceRegistry;

/**
 * Provides the local service utility for DDMStructure. This utility wraps
 * {@link com.liferay.portlet.dynamicdatamapping.service.impl.DDMStructureLocalServiceImpl} and is the
 * primary access point for service operations in application layer code running
 * on the local server. Methods of this service will not have security checks
 * based on the propagated JAAS credentials because this service can only be
 * accessed from within the same VM.
 *
 * @author Brian Wing Shun Chan
 * @see DDMStructureLocalService
 * @see com.liferay.portlet.dynamicdatamapping.service.base.DDMStructureLocalServiceBaseImpl
 * @see com.liferay.portlet.dynamicdatamapping.service.impl.DDMStructureLocalServiceImpl
 * @generated
 */
@ProviderType
public class DDMStructureLocalServiceUtil {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify this class directly. Add custom service methods to {@link com.liferay.portlet.dynamicdatamapping.service.impl.DDMStructureLocalServiceImpl} and rerun ServiceBuilder to regenerate this class.
	 */

	/**
	* Adds the d d m structure to the database. Also notifies the appropriate model listeners.
	*
	* @param ddmStructure the d d m structure
	* @return the d d m structure that was added
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure addDDMStructure(
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure ddmStructure)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().addDDMStructure(ddmStructure);
	}

	/**
	* Creates a new d d m structure with the primary key. Does not add the d d m structure to the database.
	*
	* @param structureId the primary key for the new d d m structure
	* @return the new d d m structure
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure createDDMStructure(
		long structureId) {
		return getService().createDDMStructure(structureId);
	}

	/**
	* Deletes the d d m structure with the primary key from the database. Also notifies the appropriate model listeners.
	*
	* @param structureId the primary key of the d d m structure
	* @return the d d m structure that was removed
	* @throws PortalException if a d d m structure with the primary key could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure deleteDDMStructure(
		long structureId)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().deleteDDMStructure(structureId);
	}

	/**
	* Deletes the d d m structure from the database. Also notifies the appropriate model listeners.
	*
	* @param ddmStructure the d d m structure
	* @return the d d m structure that was removed
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure deleteDDMStructure(
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure ddmStructure)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().deleteDDMStructure(ddmStructure);
	}

	public static com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery() {
		return getService().dynamicQuery();
	}

	/**
	* Performs a dynamic query on the database and returns the matching rows.
	*
	* @param dynamicQuery the dynamic query
	* @return the matching rows
	* @throws SystemException if a system exception occurred
	*/
	@SuppressWarnings("rawtypes")
	public static java.util.List dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().dynamicQuery(dynamicQuery);
	}

	/**
	* Performs a dynamic query on the database and returns a range of the matching rows.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.portlet.dynamicdatamapping.model.impl.DDMStructureModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param dynamicQuery the dynamic query
	* @param start the lower bound of the range of model instances
	* @param end the upper bound of the range of model instances (not inclusive)
	* @return the range of matching rows
	* @throws SystemException if a system exception occurred
	*/
	@SuppressWarnings("rawtypes")
	public static java.util.List dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery, int start,
		int end) throws com.liferay.portal.kernel.exception.SystemException {
		return getService().dynamicQuery(dynamicQuery, start, end);
	}

	/**
	* Performs a dynamic query on the database and returns an ordered range of the matching rows.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.portlet.dynamicdatamapping.model.impl.DDMStructureModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param dynamicQuery the dynamic query
	* @param start the lower bound of the range of model instances
	* @param end the upper bound of the range of model instances (not inclusive)
	* @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	* @return the ordered range of matching rows
	* @throws SystemException if a system exception occurred
	*/
	@SuppressWarnings("rawtypes")
	public static java.util.List dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery, int start,
		int end,
		com.liferay.portal.kernel.util.OrderByComparator orderByComparator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .dynamicQuery(dynamicQuery, start, end, orderByComparator);
	}

	/**
	* Returns the number of rows that match the dynamic query.
	*
	* @param dynamicQuery the dynamic query
	* @return the number of rows that match the dynamic query
	* @throws SystemException if a system exception occurred
	*/
	public static long dynamicQueryCount(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().dynamicQueryCount(dynamicQuery);
	}

	/**
	* Returns the number of rows that match the dynamic query.
	*
	* @param dynamicQuery the dynamic query
	* @param projection the projection to apply to the query
	* @return the number of rows that match the dynamic query
	* @throws SystemException if a system exception occurred
	*/
	public static long dynamicQueryCount(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery,
		com.liferay.portal.kernel.dao.orm.Projection projection)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().dynamicQueryCount(dynamicQuery, projection);
	}

	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure fetchDDMStructure(
		long structureId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().fetchDDMStructure(structureId);
	}

	/**
	* Returns the d d m structure with the matching UUID and company.
	*
	* @param uuid the d d m structure's UUID
	* @param companyId the primary key of the company
	* @return the matching d d m structure, or <code>null</code> if a matching d d m structure could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure fetchDDMStructureByUuidAndCompanyId(
		java.lang.String uuid, long companyId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().fetchDDMStructureByUuidAndCompanyId(uuid, companyId);
	}

	/**
	* Returns the d d m structure matching the UUID and group.
	*
	* @param uuid the d d m structure's UUID
	* @param groupId the primary key of the group
	* @return the matching d d m structure, or <code>null</code> if a matching d d m structure could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure fetchDDMStructureByUuidAndGroupId(
		java.lang.String uuid, long groupId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().fetchDDMStructureByUuidAndGroupId(uuid, groupId);
	}

	/**
	* Returns the d d m structure with the primary key.
	*
	* @param structureId the primary key of the d d m structure
	* @return the d d m structure
	* @throws PortalException if a d d m structure with the primary key could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure getDDMStructure(
		long structureId)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().getDDMStructure(structureId);
	}

	public static com.liferay.portal.kernel.dao.orm.ActionableDynamicQuery getActionableDynamicQuery()
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getActionableDynamicQuery();
	}

	public static com.liferay.portal.kernel.dao.orm.ExportActionableDynamicQuery getExportActionableDynamicQuery(
		com.liferay.portal.kernel.lar.PortletDataContext portletDataContext)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getExportActionableDynamicQuery(portletDataContext);
	}

	public static com.liferay.portal.model.PersistedModel getPersistedModel(
		java.io.Serializable primaryKeyObj)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().getPersistedModel(primaryKeyObj);
	}

	/**
	* Returns the d d m structure with the matching UUID and company.
	*
	* @param uuid the d d m structure's UUID
	* @param companyId the primary key of the company
	* @return the matching d d m structure
	* @throws PortalException if a matching d d m structure could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure getDDMStructureByUuidAndCompanyId(
		java.lang.String uuid, long companyId)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().getDDMStructureByUuidAndCompanyId(uuid, companyId);
	}

	/**
	* Returns the d d m structure matching the UUID and group.
	*
	* @param uuid the d d m structure's UUID
	* @param groupId the primary key of the group
	* @return the matching d d m structure
	* @throws PortalException if a matching d d m structure could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure getDDMStructureByUuidAndGroupId(
		java.lang.String uuid, long groupId)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().getDDMStructureByUuidAndGroupId(uuid, groupId);
	}

	/**
	* Returns a range of all the d d m structures.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent and pagination is required (<code>start</code> and <code>end</code> are not {@link com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS}), then the query will include the default ORDER BY logic from {@link com.liferay.portlet.dynamicdatamapping.model.impl.DDMStructureModelImpl}. If both <code>orderByComparator</code> and pagination are absent, for performance reasons, the query will not have an ORDER BY clause and the returned result set will be sorted on by the primary key in an ascending order.
	* </p>
	*
	* @param start the lower bound of the range of d d m structures
	* @param end the upper bound of the range of d d m structures (not inclusive)
	* @return the range of d d m structures
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getDDMStructures(
		int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getDDMStructures(start, end);
	}

	/**
	* Returns the number of d d m structures.
	*
	* @return the number of d d m structures
	* @throws SystemException if a system exception occurred
	*/
	public static int getDDMStructuresCount()
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getDDMStructuresCount();
	}

	/**
	* Updates the d d m structure in the database or adds it if it does not yet exist. Also notifies the appropriate model listeners.
	*
	* @param ddmStructure the d d m structure
	* @return the d d m structure that was updated
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure updateDDMStructure(
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure ddmStructure)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().updateDDMStructure(ddmStructure);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void addDLFileEntryTypeDDMStructure(long fileEntryTypeId,
		long structureId)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().addDLFileEntryTypeDDMStructure(fileEntryTypeId, structureId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void addDLFileEntryTypeDDMStructure(long fileEntryTypeId,
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure ddmStructure)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService()
			.addDLFileEntryTypeDDMStructure(fileEntryTypeId, ddmStructure);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void addDLFileEntryTypeDDMStructures(long fileEntryTypeId,
		long[] structureIds)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService()
			.addDLFileEntryTypeDDMStructures(fileEntryTypeId, structureIds);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void addDLFileEntryTypeDDMStructures(long fileEntryTypeId,
		java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> DDMStructures)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService()
			.addDLFileEntryTypeDDMStructures(fileEntryTypeId, DDMStructures);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void clearDLFileEntryTypeDDMStructures(long fileEntryTypeId)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().clearDLFileEntryTypeDDMStructures(fileEntryTypeId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteDLFileEntryTypeDDMStructure(long fileEntryTypeId,
		long structureId)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService()
			.deleteDLFileEntryTypeDDMStructure(fileEntryTypeId, structureId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteDLFileEntryTypeDDMStructure(long fileEntryTypeId,
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure ddmStructure)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService()
			.deleteDLFileEntryTypeDDMStructure(fileEntryTypeId, ddmStructure);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteDLFileEntryTypeDDMStructures(
		long fileEntryTypeId, long[] structureIds)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService()
			.deleteDLFileEntryTypeDDMStructures(fileEntryTypeId, structureIds);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteDLFileEntryTypeDDMStructures(
		long fileEntryTypeId,
		java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> DDMStructures)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService()
			.deleteDLFileEntryTypeDDMStructures(fileEntryTypeId, DDMStructures);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getDLFileEntryTypeDDMStructures(
		long fileEntryTypeId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getDLFileEntryTypeDDMStructures(fileEntryTypeId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getDLFileEntryTypeDDMStructures(
		long fileEntryTypeId, int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .getDLFileEntryTypeDDMStructures(fileEntryTypeId, start, end);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getDLFileEntryTypeDDMStructures(
		long fileEntryTypeId, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator orderByComparator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .getDLFileEntryTypeDDMStructures(fileEntryTypeId, start,
			end, orderByComparator);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static int getDLFileEntryTypeDDMStructuresCount(long fileEntryTypeId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getDLFileEntryTypeDDMStructuresCount(fileEntryTypeId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static boolean hasDLFileEntryTypeDDMStructure(long fileEntryTypeId,
		long structureId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .hasDLFileEntryTypeDDMStructure(fileEntryTypeId, structureId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static boolean hasDLFileEntryTypeDDMStructures(long fileEntryTypeId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().hasDLFileEntryTypeDDMStructures(fileEntryTypeId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void setDLFileEntryTypeDDMStructures(long fileEntryTypeId,
		long[] structureIds)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService()
			.setDLFileEntryTypeDDMStructures(fileEntryTypeId, structureIds);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void addJournalFolderDDMStructure(long folderId,
		long structureId)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().addJournalFolderDDMStructure(folderId, structureId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void addJournalFolderDDMStructure(long folderId,
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure ddmStructure)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().addJournalFolderDDMStructure(folderId, ddmStructure);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void addJournalFolderDDMStructures(long folderId,
		long[] structureIds)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().addJournalFolderDDMStructures(folderId, structureIds);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void addJournalFolderDDMStructures(long folderId,
		java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> DDMStructures)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().addJournalFolderDDMStructures(folderId, DDMStructures);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void clearJournalFolderDDMStructures(long folderId)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().clearJournalFolderDDMStructures(folderId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteJournalFolderDDMStructure(long folderId,
		long structureId)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().deleteJournalFolderDDMStructure(folderId, structureId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteJournalFolderDDMStructure(long folderId,
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure ddmStructure)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().deleteJournalFolderDDMStructure(folderId, ddmStructure);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteJournalFolderDDMStructures(long folderId,
		long[] structureIds)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().deleteJournalFolderDDMStructures(folderId, structureIds);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteJournalFolderDDMStructures(long folderId,
		java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> DDMStructures)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().deleteJournalFolderDDMStructures(folderId, DDMStructures);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getJournalFolderDDMStructures(
		long folderId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getJournalFolderDDMStructures(folderId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getJournalFolderDDMStructures(
		long folderId, int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getJournalFolderDDMStructures(folderId, start, end);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getJournalFolderDDMStructures(
		long folderId, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator orderByComparator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .getJournalFolderDDMStructures(folderId, start, end,
			orderByComparator);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static int getJournalFolderDDMStructuresCount(long folderId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getJournalFolderDDMStructuresCount(folderId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static boolean hasJournalFolderDDMStructure(long folderId,
		long structureId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().hasJournalFolderDDMStructure(folderId, structureId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static boolean hasJournalFolderDDMStructures(long folderId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().hasJournalFolderDDMStructures(folderId);
	}

	/**
	* @throws SystemException if a system exception occurred
	*/
	public static void setJournalFolderDDMStructures(long folderId,
		long[] structureIds)
		throws com.liferay.portal.kernel.exception.SystemException {
		getService().setJournalFolderDDMStructures(folderId, structureIds);
	}

	/**
	* Returns the Spring bean ID for this bean.
	*
	* @return the Spring bean ID for this bean
	*/
	public static java.lang.String getBeanIdentifier() {
		return getService().getBeanIdentifier();
	}

	/**
	* Sets the Spring bean ID for this bean.
	*
	* @param beanIdentifier the Spring bean ID for this bean
	*/
	public static void setBeanIdentifier(java.lang.String beanIdentifier) {
		getService().setBeanIdentifier(beanIdentifier);
	}

	/**
	* Adds a structure referencing its parent structure.
	*
	* @param userId the primary key of the structure's creator/owner
	* @param groupId the primary key of the group
	* @param parentStructureId the primary key of the parent structure
	(optionally {@link
	com.liferay.portlet.dynamicdatamapping.model.DDMStructureConstants#DEFAULT_PARENT_STRUCTURE_ID})
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param structureKey the unique string identifying the structure
	(optionally <code>null</code>)
	* @param nameMap the structure's locales and localized names
	* @param descriptionMap the structure's locales and localized descriptions
	* @param xsd the structure's XML schema definition
	* @param storageType the structure's storage type. It can be "xml" or
	"expando". For more information, see {@link
	com.liferay.portlet.dynamicdatamapping.storage.StorageType}.
	* @param type the structure's type. For more information, see {@link
	com.liferay.portlet.dynamicdatamapping.model.DDMStructureConstants}.
	* @param serviceContext the service context to be applied. Can set the
	UUID, creation date, modification date, guest permissions, and
	group permissions for the structure.
	* @return the structure
	* @throws PortalException if a user with the primary key could not be
	found, if the XSD was not well-formed, or if a portal exception
	occurred
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure addStructure(
		long userId, long groupId, long parentStructureId, long classNameId,
		java.lang.String structureKey,
		java.util.Map<java.util.Locale, java.lang.String> nameMap,
		java.util.Map<java.util.Locale, java.lang.String> descriptionMap,
		java.lang.String xsd, java.lang.String storageType, int type,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .addStructure(userId, groupId, parentStructureId,
			classNameId, structureKey, nameMap, descriptionMap, xsd,
			storageType, type, serviceContext);
	}

	/**
	* Adds a structure referencing a default parent structure, using the portal
	* property <code>dynamic.data.lists.storage.type</code> storage type and
	* default structure type.
	*
	* @param userId the primary key of the structure's creator/owner
	* @param groupId the primary key of the group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param nameMap the structure's locales and localized names
	* @param descriptionMap the structure's locales and localized descriptions
	* @param xsd the structure's XML schema definition
	* @param serviceContext the service context to be applied. Can set the
	UUID, creation date, modification date, guest permissions, and
	group permissions for the structure.
	* @return the structure
	* @throws PortalException if a user with the primary key could not be
	found, if the XSD was not well-formed, or if a portal exception
	occurred
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure addStructure(
		long userId, long groupId, long classNameId,
		java.util.Map<java.util.Locale, java.lang.String> nameMap,
		java.util.Map<java.util.Locale, java.lang.String> descriptionMap,
		java.lang.String xsd,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .addStructure(userId, groupId, classNameId, nameMap,
			descriptionMap, xsd, serviceContext);
	}

	/**
	* Adds a structure referencing a default parent structure if the parent
	* structure is not found.
	*
	* @param userId the primary key of the structure's creator/owner
	* @param groupId the primary key of the group
	* @param parentStructureKey the unique string identifying the parent
	structure (optionally <code>null</code>)
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param structureKey the unique string identifying the structure
	(optionally <code>null</code>)
	* @param nameMap the structure's locales and localized names
	* @param descriptionMap the structure's locales and localized descriptions
	* @param xsd the structure's XML schema definition
	* @param storageType the structure's storage type. It can be "xml" or
	"expando". For more information, see {@link
	com.liferay.portlet.dynamicdatamapping.storage.StorageType}.
	* @param type the structure's type. For more information, see {@link
	com.liferay.portlet.dynamicdatamapping.model.DDMStructureConstants}.
	* @param serviceContext the service context to be applied. Can set the
	UUID, creation date, modification date, guest permissions and
	group permissions for the structure.
	* @return the structure
	* @throws PortalException if a user with the primary key could not be
	found, if the XSD was not well-formed, or if a portal exception
	occurred
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure addStructure(
		long userId, long groupId, java.lang.String parentStructureKey,
		long classNameId, java.lang.String structureKey,
		java.util.Map<java.util.Locale, java.lang.String> nameMap,
		java.util.Map<java.util.Locale, java.lang.String> descriptionMap,
		java.lang.String xsd, java.lang.String storageType, int type,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .addStructure(userId, groupId, parentStructureKey,
			classNameId, structureKey, nameMap, descriptionMap, xsd,
			storageType, type, serviceContext);
	}

	/**
	* Adds the resources to the structure.
	*
	* @param structure the structure to add resources to
	* @param addGroupPermissions whether to add group permissions
	* @param addGuestPermissions whether to add guest permissions
	* @throws PortalException if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static void addStructureResources(
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure structure,
		boolean addGroupPermissions, boolean addGuestPermissions)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		getService()
			.addStructureResources(structure, addGroupPermissions,
			addGuestPermissions);
	}

	/**
	* Adds the model resources with the permissions to the structure.
	*
	* @param structure the structure to add resources to
	* @param groupPermissions the group permissions to be added
	* @param guestPermissions the guest permissions to be added
	* @throws PortalException if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static void addStructureResources(
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure structure,
		java.lang.String[] groupPermissions, java.lang.String[] guestPermissions)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		getService()
			.addStructureResources(structure, groupPermissions, guestPermissions);
	}

	/**
	* Copies a structure, creating a new structure with all the values
	* extracted from the original one. The new structure supports a new name
	* and description.
	*
	* @param userId the primary key of the structure's creator/owner
	* @param structureId the primary key of the structure to be copied
	* @param nameMap the new structure's locales and localized names
	* @param descriptionMap the new structure's locales and localized
	descriptions
	* @param serviceContext the service context to be applied. Can set the
	UUID, creation date, modification date, guest permissions, and
	group permissions for the structure.
	* @return the new structure
	* @throws PortalException if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure copyStructure(
		long userId, long structureId,
		java.util.Map<java.util.Locale, java.lang.String> nameMap,
		java.util.Map<java.util.Locale, java.lang.String> descriptionMap,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .copyStructure(userId, structureId, nameMap, descriptionMap,
			serviceContext);
	}

	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure copyStructure(
		long userId, long structureId,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().copyStructure(userId, structureId, serviceContext);
	}

	/**
	* Deletes the structure and its resources.
	*
	* <p>
	* Before deleting the structure, this method verifies whether the structure
	* is required by another entity. If it is needed, an exception is thrown.
	* </p>
	*
	* @param structure the structure to be deleted
	* @throws PortalException if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteStructure(
		com.liferay.portlet.dynamicdatamapping.model.DDMStructure structure)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		getService().deleteStructure(structure);
	}

	/**
	* Deletes the structure and its resources.
	*
	* <p>
	* Before deleting the structure, the system verifies whether the structure
	* is required by another entity. If it is needed, an exception is thrown.
	* </p>
	*
	* @param structureId the primary key of the structure to be deleted
	* @throws PortalException if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteStructure(long structureId)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		getService().deleteStructure(structureId);
	}

	/**
	* Deletes the matching structure and its resources.
	*
	* <p>
	* Before deleting the structure, the system verifies whether the structure
	* is required by another entity. If it is needed, an exception is thrown.
	* </p>
	*
	* @param groupId the primary key of the group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param structureKey the unique string identifying the structure
	* @throws PortalException if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteStructure(long groupId, long classNameId,
		java.lang.String structureKey)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		getService().deleteStructure(groupId, classNameId, structureKey);
	}

	/**
	* Deletes all the structures of the group.
	*
	* <p>
	* Before deleting the structures, the system verifies whether each
	* structure is required by another entity. If any of the structures are
	* needed, an exception is thrown.
	* </p>
	*
	* @param groupId the primary key of the group
	* @throws PortalException if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static void deleteStructures(long groupId)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		getService().deleteStructures(groupId);
	}

	/**
	* Returns the structure with the ID.
	*
	* @param structureId the primary key of the structure
	* @return the structure with the structure ID, or <code>null</code> if a
	matching structure could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure fetchStructure(
		long structureId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().fetchStructure(structureId);
	}

	/**
	* Returns the structure matching the class name ID, structure key, and
	* group.
	*
	* @param groupId the primary key of the group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param structureKey the unique string identifying the structure
	* @return the matching structure, or <code>null</code> if a matching
	structure could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure fetchStructure(
		long groupId, long classNameId, java.lang.String structureKey)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().fetchStructure(groupId, classNameId, structureKey);
	}

	/**
	* Returns the structure matching the class name ID, structure key, and
	* group, optionally in the global scope.
	*
	* <p>
	* This method first searches in the group. If the structure is still not
	* found and <code>includeAncestorStructures</code> is set to
	* <code>true</code>, this method searches the parent sites.
	* </p>
	*
	* @param groupId the primary key of the group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param structureKey the unique string identifying the structure
	* @param includeAncestorStructures whether to include the parent sites in
	the search
	* @return the matching structure, or <code>null</code> if a matching
	structure could not be found
	* @throws PortalException if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure fetchStructure(
		long groupId, long classNameId, java.lang.String structureKey,
		boolean includeAncestorStructures)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .fetchStructure(groupId, classNameId, structureKey,
			includeAncestorStructures);
	}

	/**
	* @deprecated As of 6.2.0, replaced by {@link #getClassStructures(long,
	long)}
	*/
	@Deprecated
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getClassStructures(
		long classNameId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getClassStructures(classNameId);
	}

	/**
	* @deprecated As of 6.2.0, replaced by {@link #getClassStructures(long,
	long, int, int)}
	*/
	@Deprecated
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getClassStructures(
		long classNameId, int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getClassStructures(classNameId, start, end);
	}

	/**
	* Returns all the structures matching the class name ID.
	*
	* @param companyId the primary key of the structure's company
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @return the structures matching the class name ID
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getClassStructures(
		long companyId, long classNameId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getClassStructures(companyId, classNameId);
	}

	/**
	* Returns a range of all the structures matching the class name ID.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end -
	* start</code> instances. <code>start</code> and <code>end</code> are not
	* primary keys, they are indexes in the result set. Thus, <code>0</code>
	* refers to the first result in the set. Setting both <code>start</code>
	* and <code>end</code> to {@link
	* com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full
	* result set.
	* </p>
	*
	* @param companyId the primary key of the structure's company
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param start the lower bound of the range of structures to return
	* @param end the upper bound of the range of structures to return (not
	inclusive)
	* @return the range of matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getClassStructures(
		long companyId, long classNameId, int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .getClassStructures(companyId, classNameId, start, end);
	}

	/**
	* Returns all the structures matching the class name ID ordered by the
	* comparator.
	*
	* @param companyId the primary key of the structure's company
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param orderByComparator the comparator to order the structures
	(optionally <code>null</code>)
	* @return the matching structures ordered by the comparator
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getClassStructures(
		long companyId, long classNameId,
		com.liferay.portal.kernel.util.OrderByComparator orderByComparator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .getClassStructures(companyId, classNameId, orderByComparator);
	}

	/**
	* @deprecated As of 6.2.0, replaced by {@link #getClassStructures(long,
	long, OrderByComparator)}
	*/
	@Deprecated
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getClassStructures(
		long classNameId,
		com.liferay.portal.kernel.util.OrderByComparator orderByComparator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getClassStructures(classNameId, orderByComparator);
	}

	/**
	* Returns all the structures for the document library file entry type.
	*
	* @param dlFileEntryTypeId the primary key of the document library file
	entry type
	* @return the structures for the document library file entry type
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getDLFileEntryTypeStructures(
		long dlFileEntryTypeId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getDLFileEntryTypeStructures(dlFileEntryTypeId);
	}

	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getJournalFolderStructures(
		long[] groupIds, long journalFolderId, int restrictionType)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .getJournalFolderStructures(groupIds, journalFolderId,
			restrictionType);
	}

	/**
	* Returns the structure with the ID.
	*
	* @param structureId the primary key of the structure
	* @return the structure with the ID
	* @throws PortalException if a structure with the ID could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure getStructure(
		long structureId)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructure(structureId);
	}

	/**
	* Returns the structure matching the class name ID, structure key, and
	* group.
	*
	* @param groupId the primary key of the structure's group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param structureKey the unique string identifying the structure
	* @return the matching structure
	* @throws PortalException if a matching structure could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure getStructure(
		long groupId, long classNameId, java.lang.String structureKey)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructure(groupId, classNameId, structureKey);
	}

	/**
	* Returns the structure matching the class name ID, structure key, and
	* group, optionally in the parent site.
	*
	* <p>
	* This method first searches in the group. If the structure is still not
	* found and <code>includeAncestorStructures</code> is set to
	* <code>true</code>, this method searches the parent sites.
	* </p>
	*
	* @param groupId the primary key of the structure's group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param structureKey the unique string identifying the structure
	* @param includeAncestorStructures whether to include the parent sites in
	the search
	* @return the matching structure
	* @throws PortalException if a matching structure could not be found
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure getStructure(
		long groupId, long classNameId, java.lang.String structureKey,
		boolean includeAncestorStructures)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .getStructure(groupId, classNameId, structureKey,
			includeAncestorStructures);
	}

	/**
	* Returns all the structures matching the group, name, and description.
	*
	* @param groupId the primary key of the structure's group
	* @param name the structure's name
	* @param description the structure's description
	* @return the matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructure(
		long groupId, java.lang.String name, java.lang.String description)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructure(groupId, name, description);
	}

	/**
	* @deprecated As of 6.2.0, replaced by {@link #getStructures}
	*/
	@Deprecated
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructureEntries()
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructureEntries();
	}

	/**
	* @deprecated As of 6.2.0, replaced by {@link #getStructures(long)}
	*/
	@Deprecated
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructureEntries(
		long groupId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructureEntries(groupId);
	}

	/**
	* @deprecated As of 6.2.0, replaced by {@link #getStructures(long, int,
	int)}
	*/
	@Deprecated
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructureEntries(
		long groupId, int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructureEntries(groupId, start, end);
	}

	/**
	* Returns all the structures present in the system.
	*
	* @return the structures present in the system
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures()
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures();
	}

	/**
	* Returns all the structures present in the group.
	*
	* @param groupId the primary key of the group
	* @return the structures present in the group
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long groupId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures(groupId);
	}

	/**
	* Returns a range of all the structures belonging to the group.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end -
	* start</code> instances. <code>start</code> and <code>end</code> are not
	* primary keys, they are indexes in the result set. Thus, <code>0</code>
	* refers to the first result in the set. Setting both <code>start</code>
	* and <code>end</code> to {@link
	* com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full
	* result set.
	* </p>
	*
	* @param groupId the primary key of the group
	* @param start the lower bound of the range of structures to return
	* @param end the upper bound of the range of structures to return (not
	inclusive)
	* @return the range of matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long groupId, int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures(groupId, start, end);
	}

	/**
	* Returns all the structures matching class name ID and group.
	*
	* @param groupId the primary key of the group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @return the matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long groupId, long classNameId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures(groupId, classNameId);
	}

	/**
	* Returns a range of all the structures that match the class name ID and
	* group.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end -
	* start</code> instances. <code>start</code> and <code>end</code> are not
	* primary keys, they are indexes in the result set. Thus, <code>0</code>
	* refers to the first result in the set. Setting both <code>start</code>
	* and <code>end</code> to {@link
	* com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full
	* result set.
	* </p>
	*
	* @param groupId the primary key of the group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param start the lower bound of the range of structures to return
	* @param end the upper bound of the range of structures to return (not
	inclusive)
	* @return the range of matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long groupId, long classNameId, int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures(groupId, classNameId, start, end);
	}

	/**
	* Returns an ordered range of all the structures matching the class name ID
	* and group.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end -
	* start</code> instances. <code>start</code> and <code>end</code> are not
	* primary keys, they are indexes in the result set. Thus, <code>0</code>
	* refers to the first result in the set. Setting both <code>start</code>
	* and <code>end</code> to {@link
	* com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full
	* result set.
	* </p>
	*
	* @param groupId the primary key of the group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param start the lower bound of the range of structures to return
	* @param end the upper bound of the range of structures to return (not
	inclusive)
	* @param orderByComparator the comparator to order the structures
	(optionally <code>null</code>)
	* @return the range of matching structures ordered by the comparator
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long groupId, long classNameId, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator orderByComparator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .getStructures(groupId, classNameId, start, end,
			orderByComparator);
	}

	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long groupId, java.lang.String name, java.lang.String description)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures(groupId, name, description);
	}

	/**
	* Returns all the structures belonging to the groups.
	*
	* @param groupIds the primary keys of the groups
	* @return the structures belonging to the groups
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long[] groupIds)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures(groupIds);
	}

	/**
	* Returns all the structures matching the class name ID and belonging to
	* the groups.
	*
	* @param groupIds the primary keys of the groups
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @return the matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long[] groupIds, long classNameId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures(groupIds, classNameId);
	}

	/**
	* Returns a range of all the structures matching the class name ID and
	* belonging to the groups.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end -
	* start</code> instances. <code>start</code> and <code>end</code> are not
	* primary keys, they are indexes in the result set. Thus, <code>0</code>
	* refers to the first result in the set. Setting both <code>start</code>
	* and <code>end</code> to {@link
	* com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full
	* result set.
	* </p>
	*
	* @param groupIds the primary keys of the groups
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param start the lower bound of the range of structures to return
	* @param end the upper bound of the range of structures to return (not
	inclusive)
	* @return the range of matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> getStructures(
		long[] groupIds, long classNameId, int start, int end)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructures(groupIds, classNameId, start, end);
	}

	/**
	* Returns the number of structures belonging to the group.
	*
	* @param groupId the primary key of the group
	* @return the number of structures belonging to the group
	* @throws SystemException if a system exception occurred
	*/
	public static int getStructuresCount(long groupId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructuresCount(groupId);
	}

	/**
	* Returns the number of structures matching the class name ID and group.
	*
	* @param groupId the primary key of the group
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @return the number of matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static int getStructuresCount(long groupId, long classNameId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructuresCount(groupId, classNameId);
	}

	/**
	* Returns the number of structures matching the class name ID and belonging
	* to the groups.
	*
	* @param groupIds the primary keys of the groups
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @return the number of matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static int getStructuresCount(long[] groupIds, long classNameId)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService().getStructuresCount(groupIds, classNameId);
	}

	/**
	* Returns an ordered range of all the structures matching the groups and
	* class name IDs, and matching the keywords in the structure names and
	* descriptions.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end -
	* start</code> instances. <code>start</code> and <code>end</code> are not
	* primary keys, they are indexes in the result set. Thus, <code>0</code>
	* refers to the first result in the set. Setting both <code>start</code>
	* and <code>end</code> to {@link
	* com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full
	* result set.
	* </p>
	*
	* @param companyId the primary key of the structure's company
	* @param groupIds the primary keys of the groups
	* @param classNameIds the primary keys of the class names of the models
	the structures are related to
	* @param keywords the keywords (space separated), which may occur in the
	structure's name or description (optionally <code>null</code>)
	* @param start the lower bound of the range of structures to return
	* @param end the upper bound of the range of structures to return (not
	inclusive)
	* @param orderByComparator the comparator to order the structures
	(optionally <code>null</code>)
	* @return the range of matching structures ordered by the comparator
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> search(
		long companyId, long[] groupIds, long[] classNameIds,
		java.lang.String keywords, int start, int end,
		com.liferay.portal.kernel.util.OrderByComparator orderByComparator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .search(companyId, groupIds, classNameIds, keywords, start,
			end, orderByComparator);
	}

	/**
	* Returns an ordered range of all the structures matching the groups, class
	* name IDs, name keyword, description keyword, storage type, and type.
	*
	* <p>
	* Useful when paginating results. Returns a maximum of <code>end -
	* start</code> instances. <code>start</code> and <code>end</code> are not
	* primary keys, they are indexes in the result set. Thus, <code>0</code>
	* refers to the first result in the set. Setting both <code>start</code>
	* and <code>end</code> to {@link
	* com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS} will return the full
	* result set.
	* </p>
	*
	* @param companyId the primary key of the structure's company
	* @param groupIds the primary keys of the groups
	* @param classNameIds the primary keys of the class names of the models
	the structures are related to
	* @param name the name keywords
	* @param description the description keywords
	* @param storageType the structure's storage type. It can be "xml" or
	"expando". For more information, see {@link
	com.liferay.portlet.dynamicdatamapping.storage.StorageType}.
	* @param type the structure's type. For more information, see {@link
	com.liferay.portlet.dynamicdatamapping.model.DDMStructureConstants}.
	* @param andOperator whether every field must match its keywords, or just
	one field
	* @param start the lower bound of the range of structures to return
	* @param end the upper bound of the range of structures to return (not
	inclusive)
	* @param orderByComparator the comparator to order the structures
	(optionally <code>null</code>)
	* @return the range of matching structures ordered by the comparator
	* @throws SystemException if a system exception occurred
	*/
	public static java.util.List<com.liferay.portlet.dynamicdatamapping.model.DDMStructure> search(
		long companyId, long[] groupIds, long[] classNameIds,
		java.lang.String name, java.lang.String description,
		java.lang.String storageType, int type, boolean andOperator, int start,
		int end,
		com.liferay.portal.kernel.util.OrderByComparator orderByComparator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .search(companyId, groupIds, classNameIds, name,
			description, storageType, type, andOperator, start, end,
			orderByComparator);
	}

	/**
	* Returns the number of structures matching the groups and class name IDs,
	* and matching the keywords in the structure names and descriptions.
	*
	* @param companyId the primary key of the structure's company
	* @param groupIds the primary keys of the groups
	* @param classNameIds the primary keys of the class names of the models
	the structures are related to
	* @param keywords the keywords (space separated), which may occur in the
	structure's name or description (optionally <code>null</code>)
	* @return the number of matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static int searchCount(long companyId, long[] groupIds,
		long[] classNameIds, java.lang.String keywords)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .searchCount(companyId, groupIds, classNameIds, keywords);
	}

	/**
	* Returns the number of structures matching the groups, class name IDs,
	* name keyword, description keyword, storage type, and type
	*
	* @param companyId the primary key of the structure's company
	* @param groupIds the primary keys of the groups
	* @param classNameIds the primary keys of the class names of the models
	the structure's are related to
	* @param name the name keywords
	* @param description the description keywords
	* @param storageType the structure's storage type. It can be "xml" or
	"expando". For more information, see {@link
	com.liferay.portlet.dynamicdatamapping.storage.StorageType}.
	* @param type the structure's type. For more information, see {@link
	com.liferay.portlet.dynamicdatamapping.model.DDMStructureConstants}.
	* @param andOperator whether every field must match its keywords, or just
	one field
	* @return the number of matching structures
	* @throws SystemException if a system exception occurred
	*/
	public static int searchCount(long companyId, long[] groupIds,
		long[] classNameIds, java.lang.String name,
		java.lang.String description, java.lang.String storageType, int type,
		boolean andOperator)
		throws com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .searchCount(companyId, groupIds, classNameIds, name,
			description, storageType, type, andOperator);
	}

	/**
	* Updates the structure matching the class name ID, structure key, and
	* group, replacing its old parent structure, name map, description map, and
	* XSD with new ones.
	*
	* @param groupId the primary key of the group
	* @param parentStructureId the primary key of the new parent structure
	* @param classNameId the primary key of the class name for the structure's
	related model
	* @param structureKey the unique string identifying the structure
	* @param nameMap the structure's new locales and localized names
	* @param descriptionMap the structure's new locales and localized
	description
	* @param xsd the structure's new XML schema definition
	* @param serviceContext the service context to be applied. Can set the
	structure's modification date.
	* @return the updated structure
	* @throws PortalException if a matching structure could not be found, if
	the XSD was not well-formed, or if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure updateStructure(
		long groupId, long parentStructureId, long classNameId,
		java.lang.String structureKey,
		java.util.Map<java.util.Locale, java.lang.String> nameMap,
		java.util.Map<java.util.Locale, java.lang.String> descriptionMap,
		java.lang.String xsd,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .updateStructure(groupId, parentStructureId, classNameId,
			structureKey, nameMap, descriptionMap, xsd, serviceContext);
	}

	/**
	* Updates the structure matching the structure ID, replacing its old parent
	* structure, name map, description map, and XSD with new ones.
	*
	* @param structureId the primary key of the structure
	* @param parentStructureId the primary key of the new parent structure
	* @param nameMap the structure's new locales and localized names
	* @param descriptionMap the structure's new locales and localized
	descriptions
	* @param xsd the structure's new XML schema definition
	* @param serviceContext the service context to be applied. Can set the
	structure's modification date.
	* @return the updated structure
	* @throws PortalException if a matching structure could not be found, if
	the XSD was not well-formed, or if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure updateStructure(
		long structureId, long parentStructureId,
		java.util.Map<java.util.Locale, java.lang.String> nameMap,
		java.util.Map<java.util.Locale, java.lang.String> descriptionMap,
		java.lang.String xsd,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService()
				   .updateStructure(structureId, parentStructureId, nameMap,
			descriptionMap, xsd, serviceContext);
	}

	/**
	* Updates the structure matching the structure ID, replacing its XSD with a
	* new one.
	*
	* @param structureId the primary key of the structure
	* @param xsd the structure's new XML schema definition
	* @param serviceContext the service context to be applied. Can set the
	structure's modification date.
	* @return the updated structure
	* @throws PortalException if a matching structure could not be found, if
	the XSD was not well-formed, or if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static com.liferay.portlet.dynamicdatamapping.model.DDMStructure updateXSD(
		long structureId, java.lang.String xsd,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		return getService().updateXSD(structureId, xsd, serviceContext);
	}

	/**
	* Updates the structure matching the structure ID, replacing the metadata
	* entry of the named field.
	*
	* @param structureId the primary key of the structure
	* @param fieldName the name of the field whose metadata to update
	* @param metadataEntryName the metadata entry's name
	* @param metadataEntryValue the metadata entry's value
	* @param serviceContext the service context to be applied. Can set the
	structure's modification date.
	* @throws PortalException if a matching structure could not be found, if
	the XSD was not well-formed, or if a portal exception occurred
	* @throws SystemException if a system exception occurred
	*/
	public static void updateXSDFieldMetadata(long structureId,
		java.lang.String fieldName, java.lang.String metadataEntryName,
		java.lang.String metadataEntryValue,
		com.liferay.portal.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException,
			com.liferay.portal.kernel.exception.SystemException {
		getService()
			.updateXSDFieldMetadata(structureId, fieldName, metadataEntryName,
			metadataEntryValue, serviceContext);
	}

	public static DDMStructureLocalService getService() {
		if (_service == null) {
			_service = (DDMStructureLocalService)PortalBeanLocatorUtil.locate(DDMStructureLocalService.class.getName());

			ReferenceRegistry.registerReference(DDMStructureLocalServiceUtil.class,
				"_service");
		}

		return _service;
	}

	/**
	 * @deprecated As of 6.2.0
	 */
	@Deprecated
	public void setService(DDMStructureLocalService service) {
	}

	private static DDMStructureLocalService _service;
}