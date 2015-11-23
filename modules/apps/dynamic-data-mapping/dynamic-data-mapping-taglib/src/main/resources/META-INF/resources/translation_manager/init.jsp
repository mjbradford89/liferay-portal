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

@generated
--%>

<%@ include file="/init.jsp" %>

<%
java.util.Locale[] availableLocales = (java.util.Locale[])request.getAttribute("liferay-ddm:translation-manager:availableLocales");
java.lang.String defaultLanguageId = GetterUtil.getString((java.lang.String)request.getAttribute("liferay-ddm:translation-manager:defaultLanguageId"));
java.lang.String editingLanguageId = GetterUtil.getString((java.lang.String)request.getAttribute("liferay-ddm:translation-manager:editingLanguageId"));
java.lang.String id = GetterUtil.getString((java.lang.String)request.getAttribute("liferay-ddm:translation-manager:id"));
boolean initialize = GetterUtil.getBoolean(String.valueOf(request.getAttribute("liferay-ddm:translation-manager:initialize")), true);
boolean readOnly = GetterUtil.getBoolean(String.valueOf(request.getAttribute("liferay-ddm:translation-manager:readOnly")));
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("liferay-ddm:translation-manager:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("liferay-ddm:translation-manager:scopedAttributes");
%>

<%@ include file="/translation_manager/init-ext.jspf" %>