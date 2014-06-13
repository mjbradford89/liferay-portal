AUI.add(
	'liferay-upload-data',
	function(A) {
		var Data = {};

		Liferay.Upload.Data = Data;
	},
	'',
	{
		requires: ['liferay-upload']
	}
);

AUI.add(
	'liferay-upload-data-validation',
	function(A) {
		var Validation = {};

		Liferay.Upload.Data.Validation = Data;
	},
	'',
	{
		requires: ['liferay-upload-data']
	}
);

AUI.add(
	'liferay-upload-data-queue',
	function(A) {
		var Queue = {};

		Liferay.Upload.Data.Queue = Data;
	},
	'',
	{
		requires: ['liferay-upload-data']
	}
);