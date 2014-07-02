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

package com.liferay.portlet.dynamicdatalists.util;

import aQute.bnd.annotation.ProviderType;

import com.liferay.portal.kernel.dao.orm.QueryUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.OrderByComparator;
import com.liferay.portal.kernel.workflow.WorkflowConstants;
import com.liferay.portlet.dynamicdatalists.model.DDLRecord;
import com.liferay.portlet.dynamicdatalists.model.DDLRecordSet;
import com.liferay.portlet.dynamicdatalists.service.DDLRecordSetServiceUtil;
import com.liferay.portlet.dynamicdatamapping.model.DDMStructure;
import com.liferay.portlet.dynamicdatamapping.storage.FieldConstants;

import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

/**
 * @author Marcellus Tavares
 * @author Manuel de la Peña
 */
@ProviderType
public abstract class BaseDDLExporter implements DDLExporter {

	@Override
	public byte[] export(long recordSetId) throws Exception {
		return doExport(
			recordSetId, WorkflowConstants.STATUS_ANY, QueryUtil.ALL_POS,
			QueryUtil.ALL_POS, null);
	}

	@Override
	public byte[] export(long recordSetId, int status) throws Exception {
		return doExport(
			recordSetId, status, QueryUtil.ALL_POS, QueryUtil.ALL_POS, null);
	}

	@Override
	public byte[] export(long recordSetId, int status, int start, int end)
		throws Exception {

		return doExport(recordSetId, status, start, end, null);
	}

	@Override
	public byte[] export(
			long recordSetId, int status, int start, int end,
			OrderByComparator<DDLRecord> orderByComparator)
		throws Exception {

		return doExport(recordSetId, status, start, end, orderByComparator);
	}

	@Override
	public Locale getLocale() {
		if (_locale == null) {
			_locale = LocaleUtil.getSiteDefault();
		}

		return _locale;
	}

	@Override
	public void setLocale(Locale locale) {
		_locale = locale;
	}

	protected abstract byte[] doExport(
			long recordSetId, int status, int start, int end,
			OrderByComparator<DDLRecord> orderByComparator)
		throws Exception;

	protected Map<String, Map<String, String>> getFieldsMap(long recordSetId)
		throws Exception {

		DDLRecordSet recordSet = DDLRecordSetServiceUtil.getRecordSet(
			recordSetId);

		DDMStructure ddmStructure = recordSet.getDDMStructure();

		Map<String, Map<String, String>> structureFieldsMap =
			ddmStructure.getFieldsMap(LocaleUtil.toLanguageId(getLocale()));

		Map<String, Map<String, String>> fieldsMap =
			new LinkedHashMap<String, Map<String, String>>();

		for (Map.Entry<String, Map<String, String>> entry :
				structureFieldsMap.entrySet()) {

			Map<String, String> fieldMap = entry.getValue();

			if (GetterUtil.getBoolean(fieldMap.get(FieldConstants.PRIVATE))) {
				continue;
			}

			fieldsMap.put(entry.getKey(), entry.getValue());
		}

		return fieldsMap;
	}

	private Locale _locale;

}