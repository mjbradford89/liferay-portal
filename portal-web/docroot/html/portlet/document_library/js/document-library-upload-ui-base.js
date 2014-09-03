AUI.add(
	'document-library-upload-ui-base',
	function(A) {

		var  UploadUIBase = A.Component.create(
			{
				NAME: 'documentlibraryuploaduibase',

				AUGMENTS: [],

				ATTRS: {

				},

				prototype: {
					renderUI: function() {

					},

					bindUI: function() {

					}
				}
			}
		);

		Liferay.UploadUIBase = UploadUIBase;
	},
	'',
	{
		requires: ['aui-component', 'aui-data-set-deprecated', 'aui-overlay-manager-deprecated', 'aui-overlay-mask-deprecated', 'aui-parse-content', 'aui-progressbar', 'aui-template-deprecated', 'aui-tooltip', 'liferay-app-view-folders', 'liferay-app-view-move', 'liferay-app-view-paginator', 'liferay-app-view-select', 'liferay-search-container', 'liferay-storage-formatter', 'querystring-parse-simple']
	}
);