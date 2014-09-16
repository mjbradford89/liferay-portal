AUI.add(
	'liferay-upload-ui-base',
	function(A) {
		var Lang = A.Lang;

		var UploadUIBase = function() {};

		UploadUIBase.prototype =
			{

			};

			A.Base.mix(Liferay.UploadBase, [UploadUIBase]);
	},
	'',
	{
		requires: ['liferay-upload-base']
	}
);