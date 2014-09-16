AUI.add(
	'liferay-upload-data-validation',
	function(A) {
		var Lang = A.Lang;

		var UploadDataValidation = function() {};

		UploadDataValidation.prototype = {
				validateFiles: function(data) {
					var instance = this;

					var maxFileSize = instance.get('maxFileSize');

					return A.Array.partition(
						data,
						function(item, index) {
							var errorMessage;

							var size = item.get('size') || 0;
							var type = item.get('type') || '';

							var strings = instance.get('strings');

							if ((maxFileSize !== 0) && (size > maxFileSize)) {
								errorMessage = Lang.sub(strings.invalidFileSize, [instance.formatStorage(instance._maxFileSize)]);
							}
							else if (!type) {
								errorMessage = strings.invalidFileType;
							}
							else if (size === 0) {
								errorMessage = strings.zeroByteFile;
							}

							item.errorMessage = errorMessage;
							item.size = size;
							item.name = item.get('name');

							return !errorMessage;
						}
					);
				}
			};

			A.augment(UploadDataValidation, Liferay.StorageFormatter);

			A.Base.mix(Liferay.UploadBase, [UploadDataValidation]);
	},
	'',
	{
		requires: ['aui-component', 'liferay-storage-formatter', 'liferay-upload-base', 'array-extras']
	}
);