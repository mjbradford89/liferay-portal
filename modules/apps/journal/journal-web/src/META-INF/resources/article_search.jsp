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
long folderId = GetterUtil.getLong((String)liferayPortletRequest.getAttribute("view.jsp-folderId"));

PortletURL portletURL = liferayPortletResponse.createRenderURL();

portletURL.setParameter("folderId", String.valueOf(folderId));

ArticleSearch searchContainer = new ArticleSearch(liferayPortletRequest, portletURL);

searchContainer.setEmptyResultsMessage("no-web-content-was-found-that-matched-the-specified-filters");

ArticleDisplayTerms displayTerms = (ArticleDisplayTerms)searchContainer.getDisplayTerms();
%>

<liferay-ui:search-toggle
	autoFocus="<%= windowState.equals(WindowState.MAXIMIZED) %>"
	buttonLabel="search"
	displayTerms="<%= displayTerms %>"
	id="<%= renderResponse.getNamespace() %>"
	view="lexicon"
>
	<aui:fieldset>
		<aui:input inlineField="<%= true %>" label="id" name="<%= ArticleDisplayTerms.ARTICLE_ID %>" size="20" value="<%= displayTerms.getArticleId() %>" />

		<aui:input inlineField="<%= true %>" name="<%= ArticleDisplayTerms.TITLE %>" size="20" type="text" value="<%= displayTerms.getTitle() %>" />

		<aui:input inlineField="<%= true %>" label="summary" name="<%= ArticleDisplayTerms.DESCRIPTION %>" size="20" type="text" value="<%= displayTerms.getDescription() %>" />
	</aui:fieldset>

	<aui:fieldset>
		<aui:input inlineField="<%= true %>" name="<%= ArticleDisplayTerms.CONTENT %>" size="20" type="text" value="<%= displayTerms.getContent() %>" />

		<c:if test="<%= !portletName.equals(JournalPortletKeys.JOURNAL) || ((themeDisplay.getScopeGroupId() == themeDisplay.getCompanyGroupId()) && (Validator.isNotNull(displayTerms.getDDMStructureKey()) || Validator.isNotNull(displayTerms.getDDMTemplateKey()))) %>">

			<%
			List<Group> mySiteGroups = user.getMySiteGroups();

			List<Layout> scopeLayouts = new ArrayList<Layout>();

			scopeLayouts.addAll(LayoutLocalServiceUtil.getScopeGroupLayouts(themeDisplay.getSiteGroupId(), false));
			scopeLayouts.addAll(LayoutLocalServiceUtil.getScopeGroupLayouts(themeDisplay.getSiteGroupId(), true));
			%>

			<aui:select inlineField="<%= true %>" label="my-sites" name="<%= ArticleDisplayTerms.GROUP_ID %>" showEmptyOption="<%= (themeDisplay.getScopeGroupId() == themeDisplay.getCompanyGroupId()) && (Validator.isNotNull(displayTerms.getDDMStructureKey()) || Validator.isNotNull(displayTerms.getDDMTemplateKey())) %>">
				<aui:option label="global" selected="<%= displayTerms.getGroupId() == themeDisplay.getCompanyGroupId() %>" value="<%= themeDisplay.getCompanyGroupId() %>" />

				<%
				for (Group mySiteGroup : mySiteGroups) {
					if (mySiteGroup.hasStagingGroup() && !mySiteGroup.isStagedRemotely() && mySiteGroup.isStagedPortlet(JournalPortletKeys.JOURNAL)) {
						mySiteGroup = mySiteGroup.getStagingGroup();
					}
				%>

					<aui:option label='<%= mySiteGroup.isUser() ? "my-site" : HtmlUtil.escape(mySiteGroup.getDescriptiveName(locale)) %>' selected="<%= displayTerms.getGroupId() == mySiteGroup.getGroupId() %>" value="<%= mySiteGroup.getGroupId() %>" />

				<%
				}

				if (!scopeLayouts.isEmpty()) {
					for (Layout curScopeLayout : scopeLayouts) {
						Group scopeGroup = curScopeLayout.getScopeGroup();

						String label = HtmlUtil.escape(curScopeLayout.getName(locale));

						if (curScopeLayout.equals(layout)) {
							label = LanguageUtil.get(request, "current-page") + " (" + label + ")";
						}
						%>

						<aui:option label="<%= label %>" selected="<%= displayTerms.getGroupId() == scopeGroup.getGroupId() %>" value="<%= scopeGroup.getGroupId() %>" />

				<%
					}
				}
				%>

			</aui:select>
		</c:if>

		<c:if test="<%= portletName.equals(JournalPortletKeys.JOURNAL) %>">
			<div class="separator"><!-- --></div>

			<aui:select name="<%= ArticleDisplayTerms.STATUS %>" value="<%= displayTerms.getStatus() %>">
				<aui:option label="<%= WorkflowConstants.getStatusLabel(WorkflowConstants.STATUS_ANY) %>" value="<%= WorkflowConstants.STATUS_ANY %>" />
				<aui:option label="<%= WorkflowConstants.getStatusLabel(WorkflowConstants.STATUS_DRAFT) %>" value="<%= WorkflowConstants.STATUS_DRAFT %>" />

				<c:if test="<%= WorkflowDefinitionLinkLocalServiceUtil.getWorkflowDefinitionLinksCount(themeDisplay.getCompanyId(), scopeGroupId, JournalFolder.class.getName()) > 0 %>">
					<aui:option label="<%= WorkflowConstants.getStatusLabel(WorkflowConstants.STATUS_PENDING) %>" value="<%= WorkflowConstants.STATUS_PENDING %>" />
					<aui:option label="<%= WorkflowConstants.getStatusLabel(WorkflowConstants.STATUS_DENIED) %>" value="<%= WorkflowConstants.STATUS_DENIED %>" />
				</c:if>

				<aui:option label="<%= WorkflowConstants.getStatusLabel(WorkflowConstants.STATUS_SCHEDULED) %>" value="<%= WorkflowConstants.STATUS_SCHEDULED %>" />
				<aui:option label="<%= WorkflowConstants.getStatusLabel(WorkflowConstants.STATUS_APPROVED) %>" value="<%= WorkflowConstants.STATUS_APPROVED %>" />
				<aui:option label="<%= WorkflowConstants.getStatusLabel(WorkflowConstants.STATUS_EXPIRED) %>" value="<%= WorkflowConstants.STATUS_EXPIRED %>" />
			</aui:select>
		</c:if>
	</aui:fieldset>
</liferay-ui:search-toggle>