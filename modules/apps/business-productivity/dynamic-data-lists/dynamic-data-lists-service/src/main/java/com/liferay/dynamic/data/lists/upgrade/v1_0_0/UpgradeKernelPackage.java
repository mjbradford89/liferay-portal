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

package com.liferay.dynamic.data.lists.upgrade.v1_0_0;

/**
 * @author Marcellus Tavares
 */
public class UpgradeKernelPackage
	extends com.liferay.portal.upgrade.v7_0_0.UpgradeKernelPackage {

	@Override
	protected String[][] getClassNames() {
		return _CLASS_NAMES;
	}

	@Override
	protected String[][] getResourceNames() {
		return _RESOURCE_NAMES;
	}

	private static final String[][] _CLASS_NAMES = new String[][] {
		{
			"com.liferay.portlet.dynamicdatalists.model.DDLRecordSet",
			"com.liferay.dynamic.data.list.model.DDLRecordSet"
		},
		{
			"com.liferay.portlet.dynamicdatalists.model.DDLRecordVersion",
			"com.liferay.dynamic.data.list.model.DDLRecordVersion"
		},
		{
			"com.liferay.portlet.dynamicdatalists.model.DDLRecord",
			"com.liferay.dynamic.data.list.model.DDLRecord"
		}
	};

	private static final String[][] _RESOURCE_NAMES = new String[][] {
		{
			"com.liferay.portlet.dynamicdatalists",
			"com.liferay.dynamic.data.lists"
		}
	};

}