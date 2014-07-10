AUI.add(
	'liferay-upload-data',
	function(A) {
		var Data = {};

		var Validation = A.Component.create(
			{
				ATTRS: {},
				// AUGMENTS: [A.WidgetChild],
				// EXTENDS: A.Base,
				NAME: 'datavalidation',
				prototype: {
					initializer: function() {
						var instance = this;


					}
				}
			}
		);

		Data.Validation = Validation;

		var Queue = A.Component.create(
			{
				ATTRS: {},
				// AUGMENTS: [A.WidgetChild],
				// EXTENDS: A.Base,
				NAME: 'dataqueue',
				prototype: {
					initializer: function() {
						var instance = this;


					}
				}
			}
		);

		Data.Queue = Data;

		Liferay.Upload.Data = Data;
	},
	'',
	{
		requires: ['liferay-upload-base']
	}
);