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

<%@ include file="/html/portlet/group_statistics/init.jsp" %>

<%
int index = ParamUtil.getInteger(request, "index", GetterUtil.getInteger((String)request.getAttribute("configuration.jsp-index")));

String displayActivityCounterName = PrefsParamUtil.getString(portletPreferences, request, "displayActivityCounterName" + index);
String chartType = PrefsParamUtil.getString(portletPreferences, request, "chartType" + index);
int chartWidth = PrefsParamUtil.getInteger(portletPreferences, request, "chartWidth" + index, 35);
String dataRange = PrefsParamUtil.getString(portletPreferences, request, "dataRange" + index);

List<String> activityCounterNames = SocialConfigurationUtil.getActivityCounterNames(SocialActivityCounterConstants.TYPE_ACTOR);

activityCounterNames.addAll(SocialConfigurationUtil.getActivityCounterNames(SocialActivityCounterConstants.TYPE_ASSET));

activityCounterNames.add(SocialActivityCounterConstants.NAME_ASSET_ACTIVITIES);
activityCounterNames.add(SocialActivityCounterConstants.NAME_USER_ACHIEVEMENTS);
activityCounterNames.add(SocialActivityCounterConstants.NAME_USER_ACTIVITIES);

Collections.sort(activityCounterNames, new SocialActivityCounterNameComparator(locale));
%>

<div class="field-row">
	<span class="field field-inline inline-text">
		<liferay-ui:message key="group-statistics-add-counter-first-text" />
	</span>

	<aui:select inlineField="<%= true %>" label="" name='<%= "preferences--displayActivityCounterName" + index + "--" %>' title="display-activity-counter-name">

		<%
		for (String activityCounterName : activityCounterNames) {
			if (activityCounterName.equals(SocialActivityCounterConstants.NAME_CONTRIBUTION) || activityCounterName.equals(SocialActivityCounterConstants.NAME_PARTICIPATION)) {
				continue;
			}
		%>

			<aui:option label='<%= LanguageUtil.get(pageContext, "group.statistics.config."+ activityCounterName) %>' selected="<%= activityCounterName.equals(displayActivityCounterName) %>" value="<%= activityCounterName %>" />

		<%
		}
		%>

	</aui:select>

	<span class="field field-inline inline-text">
		<liferay-ui:message key="group-statistics-add-counter-second-text" />
	</span>

	<aui:select inlineField="<%= true %>" label="" name='<%= "preferences--chartType" + index + "--" %>' title="chart-type" value="<%= chartType %>">
		<aui:option label="group-statistics-chart-type-area-diagram" value="area" />
		<aui:option label="group-statistics-chart-type-column-diagram" value="column" />
		<aui:option label="group-statistics-chart-type-activity-distribution" value="pie" />
		<aui:option label="group-statistics-chart-type-tag-cloud" value="tag-cloud" />
	</aui:select>

	<span class="field field-inline inline-text">
		<liferay-ui:message key="group-statistics-add-counter-third-text" />
	</span>

	<aui:select inlineField="<%= true %>" label="" name='<%= "preferences--dataRange" + index + "--" %>' title="date-range" value="<%= dataRange %>">
		<aui:option label="group-statistics-data-range-this-year" value="year" />
		<aui:option label="group-statistics-data-range-last-12-months" value="12months" />
	</aui:select>
</div>

<div class="field-row">
	<span class="field field-inline inline-text">
		<liferay-ui:message key="chart-width" />:
	</span>

	<aui:select inlineField="<%= true %>" label="" name='<%= "preferences--chartWidth" + index + "--" %>' title="chart-width">

		<%
		for (int i = 5; i < 100; i = i + 5) {
		%>

			<aui:option label="<%= i + StringPool.PERCENT %>" selected="<%= chartWidth == i %>" value="<%= i %>" />

		<%
		}
		%>

	</aui:select>
</div>