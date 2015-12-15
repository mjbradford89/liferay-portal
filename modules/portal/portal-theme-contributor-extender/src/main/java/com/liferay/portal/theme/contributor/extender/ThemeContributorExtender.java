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

package com.liferay.portal.theme.contributor.extender;

import com.liferay.portal.kernel.util.SetUtil;
import com.liferay.portal.kernel.util.StringUtil;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import java.net.URL;

import java.util.Dictionary;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.felix.utils.extender.AbstractExtender;
import org.apache.felix.utils.extender.Extension;
import org.apache.felix.utils.log.Logger;

import org.json.JSONObject;
import org.json.JSONTokener;

import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;

/**
 * @author Michael Bradford
 */
@Component(
	immediate = true,
	property = {
		"theme.contributor.types=control-menu,product-menu,simulation-device"
	}
)
public class ThemeContributorExtender extends AbstractExtender {

	@Activate
	protected void activate(
			BundleContext bundleContext, Map<String, String> properties)
		throws Exception {

		_bundleContext = bundleContext;
		_logger = new Logger(bundleContext);

		_themeContributorTypes = SetUtil.fromArray((StringUtil.split(
			properties.get("theme.contributor.types"))));

		_themeContributorExtensionsMap = new HashMap<>();

		start(bundleContext);
	}

	@Deactivate
	protected void deactivate() throws Exception {
		stop(_bundleContext);

		_bundleContext = null;
	}

	@Override
	protected void debug(Bundle bundle, String s) {
		_logger.log(Logger.LOG_DEBUG, "[" + bundle + "] " + s);
	}

	@Override
	protected Extension doCreateExtension(Bundle bundle) throws Exception {
		Dictionary<String, String> headers = bundle.getHeaders();

		String themeContributorType = headers.get("Theme-Contributor-Type");

		if (themeContributorType == null) {
			URL entryURL = bundle.getEntry("/package.json");

			if (entryURL == null) {
				return null;
			}

			try (Reader reader = new InputStreamReader(entryURL.openStream())) {
				JSONTokener jsonTokener = new JSONTokener(reader);

				JSONObject packageJsonObject = new JSONObject(jsonTokener);

				JSONObject liferayThemeJSONObject =
					packageJsonObject.getJSONObject("liferayTheme");

				themeContributorType = liferayThemeJSONObject.getString(
					"themeContributorType");

				if (themeContributorType == null) {
					return null;
				}
			}
			catch (IOException ioe) {
				throw new RuntimeException(ioe);
			}
		}

		if (!_themeContributorTypes.contains(themeContributorType)) {
			return null;
		}

		ThemeContributorExtension extension = new ThemeContributorExtension(
			bundle);

		if (_themeContributorExtensionsMap.containsKey(themeContributorType)) {
			Extension existingExtension = _themeContributorExtensionsMap.get(
				themeContributorType);

			existingExtension.destroy();
		}

		_themeContributorExtensionsMap.put(themeContributorType, extension);

		return extension;
	}

	@Override
	protected void error(String s, Throwable t) {
		_logger.log(Logger.LOG_ERROR, s, t);
	}

	@Override
	protected void warn(Bundle bundle, String s, Throwable t) {
		_logger.log(Logger.LOG_WARNING, "[" + bundle + "] " + s, t);
	}

	private BundleContext _bundleContext;
	private Logger _logger;
	private Map<String, Extension> _themeContributorExtensionsMap;
	private Set<String> _themeContributorTypes;

}