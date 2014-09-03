AUI.add(
	'liferay-upload-data-validation',
	function(A) {
		var Lang = A.Lang;

		var UploadDataValidation = A.Component.create({

			NAME: 'UploadDataValidation',

			ATTRS: {
				maxFileSize: {
					value: 0
				}
			},

			prototype: {
				getValidFiles: function(data) {
					var instance = this;

					var strings = instance.get('strings');

					var maxFileSize = instance.get('maxFileSize');

					return A.Array.filter(
						data,
						function(item, index) {

							var id = item.get('id') || A.guid();
							var name = item.get('name');
							var size = item.get('size') || 0;

							var error;
							var file;

							if (size === 0) {
								error = strings.zeroByteSizeText;
							}
							else if (name.length > 240) {
								error = strings.invalidFileNameText;
							}
							else if (maxFileSize > 0 && (size > maxFileSize)) {
								error = instance._invalidFileSizeText;
							}

							if (error) {
								item.error = error;
							}
							else {
								file = item;
							}

							item.id = id;
							item.name = name;
							item.size = size;

							return file;
						}
					);
				}
			}
		})

		Liferay.UploadDataValidation = UploadDataValidation;
	},
	'',
	{
		requires: ['liferay-storage-formatter', 'array-extras']
	}
);