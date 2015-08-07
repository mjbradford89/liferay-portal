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

<%@ include file="/init.jsp" %>

<%
String redirect = ParamUtil.getString(request, "redirect");

ResultRow row = (ResultRow)request.getAttribute(WebKeys.SEARCH_CONTAINER_RESULT_ROW);

DDMTemplateVersion templateVersion = (DDMTemplateVersion)row.getObject();
%>

<liferay-ui:icon-menu icon="<%= StringPool.BLANK %>" message="<%= StringPool.BLANK %>">
	<liferay-portlet:renderURL portletName="<%= DDMPortletKeys.DYNAMIC_DATA_MAPPING %>" var="viewTemplateVersionURL" windowState="<%= WindowState.MAXIMIZED.toString() %>">
		<portlet:param name="mvcPath" value="/view_template_version.jsp" />
		<portlet:param name="redirect" value="<%= redirect %>" />
		<portlet:param name="templateVersionId" value="<%= String.valueOf(templateVersion.getTemplateVersionId()) %>" />
		<portlet:param name="formBuilderReadOnly" value="<%= Boolean.TRUE.toString() %>" />
	</liferay-portlet:renderURL>

	<liferay-ui:icon
		iconCssClass="icon-search"
		message="view[action]"
		url="<%= viewTemplateVersionURL %>"
	/>

	<c:if test="<%= templateVersion.isApproved() %>">
		<portlet:actionURL name="revertTemplate" var="revertURL">
			<portlet:param name="mvcPath" value="/edit_template.jsp" />
			<portlet:param name="redirect" value="<%= redirect %>" />
			<portlet:param name="templateId" value="<%= String.valueOf(templateVersion.getTemplateId()) %>" />
			<portlet:param name="version" value="<%= templateVersion.getVersion() %>" />
		</portlet:actionURL>

		<liferay-ui:icon
			iconCssClass="icon-undo"
			message="revert"
			url="<%= revertURL %>"
		/>
	</c:if>
</liferay-ui:icon-menu>