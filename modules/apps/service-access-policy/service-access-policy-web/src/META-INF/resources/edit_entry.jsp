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

long sapEntryId = ParamUtil.getLong(request, "sapEntryId");

SAPEntry sapEntry = null;

if (sapEntryId > 0) {
	sapEntry = SAPEntryServiceUtil.getSAPEntry(sapEntryId);
}

boolean defaultSAPEntry = false;

if (sapEntry != null) {
	defaultSAPEntry = sapEntry.isDefaultSAPEntry();
}
%>

<liferay-ui:header
	backURL="<%= redirect %>"
	title='<%= (sapEntry != null) ? sapEntry.getTitle(locale) : "new-service-access-policy" %>'
/>

<portlet:actionURL name="updateSAPEntry" var="updateSAPEntryURL">
	<portlet:param name="mvcPath" value="/edit_entry.jsp" />
</portlet:actionURL>

<aui:form action="<%= updateSAPEntryURL %>">
	<aui:input name="redirect" type="hidden" value="<%= redirect %>" />
	<aui:input name="sapEntryId" type="hidden" value="<%= sapEntryId %>" />

	<liferay-ui:error exception="<%= DuplicateSAPEntryNameException.class %>" message="please-enter-a-unique-service-access-policy-name" />
	<liferay-ui:error exception="<%= SAPEntryNameException.class %>" message="service-access-policy-name-is-required" />
	<liferay-ui:error exception="<%= SAPEntryTitleException.class %>" message="service-access-policy-title-is-required" />

	<aui:model-context bean="<%= sapEntry %>" model="<%= SAPEntry.class %>" />

	<aui:input disabled="<%= defaultSAPEntry %>" name="name" required="<%= true %>">
		<aui:validator errorMessage="this-field-is-required-and-must-contain-only-following-characters" name="custom">
			function(val, fieldNode, ruleValue) {
				var allowedCharacters = '<%= HtmlUtil.escapeJS(SAPEntryConstants.NAME_ALLOWED_CHARACTERS) %>';

				val = val.trim();

				var regex = new RegExp('[^' + allowedCharacters + ']');

				return !regex.test(val);
			}
		</aui:validator>
	</aui:input>

	<aui:input name="title" required="<%= true %>" />

	<aui:input helpMessage="allowed-service-signatures-helpallowed-service-signatures-help" name="allowedServiceSignatures" />

	<aui:button-row>
		<aui:button type="submit" value="save" />
	</aui:button-row>
</aui:form>

<portlet:resourceURL var="getServicesURL">
	<portlet:param name="<%= ActionRequest.ACTION_NAME %>" value="getServices" />
	<portlet:param name="mvcPath" value="<%= StringPool.SPACE %>" />
</portlet:resourceURL>

<aui:script sandbox="<% true %>" use="liferay-autocomplete-textarea">
	new Liferay.AutoCompleteTextarea(
		{
			inputNode: '#<portlet:namespace />allowedServiceSignatures',
			trigger: [
				{
					resultTextLocator: 'serviceClass',
					source: '<%= getServicesURL %>',
					term: '+',
					tplResults: '{serviceClass}'
				}
			]
		}
	).render();

	new Liferay.AutoCompleteTextarea(
		{
			inputNode: '#<portlet:namespace />disallowedServiceSignatures',
			trigger: [
				{
					resultTextLocator: 'serviceClass',
					source: '<%= getServicesURL %>',
					term: '-',
					tplResults: '{serviceClass}'
				}
			]
		}
	).render();
</aui:script>