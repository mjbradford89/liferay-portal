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

package com.liferay.wiki.settings.internal;

import com.liferay.portal.kernel.settings.definition.SettingsIdMapping;
import com.liferay.wiki.configuration.WikiGroupServiceConfiguration;
import com.liferay.wiki.constants.WikiConstants;

import org.osgi.service.component.annotations.Component;

/**
 * @author Iván Zaera
 */
@Component
public class WikiGroupServiceSettingsIdMapping implements SettingsIdMapping {

	@Override
	public Class<?> getConfigurationBeanClass() {
		return WikiGroupServiceConfiguration.class;
	}

	@Override
	public String getSettingsId() {
		return WikiConstants.SERVICE_NAME;
	}

}