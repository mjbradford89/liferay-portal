<%@ include file="/init.jsp" %>

<script src="https://npmcdn.com/zone.js@0.6.12?main=browser"></script>
<script src="https://npmcdn.com/reflect-metadata@0.1.3"></script>
<script src="https://npmcdn.com/systemjs@0.19.27/dist/system.src.js"></script>

<script src="/o/angular-portlet/js/system.config.js"></script>

<aui:script>
	System.import('app').then(function(module) {
		module.main(Liferay);
	}).catch(function(err){ console.error(err); });
</aui:script>

<base href="<%= PortletURLFactoryUtil.create(request, portletDisplay.getId(), PortletRequest.RENDER_PHASE) %>">

<my-app>Loading...</my-app>