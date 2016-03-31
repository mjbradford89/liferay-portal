<%--
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
--%>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>

<%@ page import="com.liferay.frontend.js.spa.web.servlet.taglib.util.SPAUtil" %>

<%@ page import="java.util.Iterator" %><%@
page import="java.util.Set" %>

<liferay-theme:defineObjects />

<%
Set<String> faviconLoadingFramesPaths = theme.getFaviconLoadingFramesPaths();
Iterator pathsIterator = faviconLoadingFramesPaths.iterator();
StringBuilder sb = new StringBuilder();

sb.append("[");

while (pathsIterator.hasNext()) {
	String path = (String)pathsIterator.next();

	sb.append("'");
	sb.append(path.substring(path.indexOf("/favicon_loading_frames")));
	sb.append("'");

	if (pathsIterator.hasNext()) {
		sb.append(",");
	}
}

sb.append("]");
%>

<aui:script position="inline" require="frontend-js-spa-web/liferay/init.es">
	var app = Liferay.SPA.app;

	app.setBlacklist(<%= SPAUtil.getPortletsBlacklist(themeDisplay) %>);
	app.setValidStatusCodes(<%= SPAUtil.getValidStatusCodes() %>);
	app.createFaviconAnimation(<%= sb.toString() %>);
</aui:script>

<aui:script>
	Liferay.SPA = Liferay.SPA || {};

	Liferay.SPA.clearScreensCache = <%= SPAUtil.isClearScreensCache(request, session) %>;
</aui:script>