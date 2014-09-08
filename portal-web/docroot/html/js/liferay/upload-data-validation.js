AUI.add(
	'liferay-upload-data-validation',
	function(A) {
		var UploadDataValidation = A.Component.create(
			{
				NAME: 'UploadDataValidation',

				ATTRS: {
					maxFileSize: {
						value: 0
					}
				},

				prototype: {
					getValidFiles: function(data) {
						var instance = this;

						var maxFileSize = instance._maxFileSize;

						return A.Array.partition(
							data,
							function(item, index) {
								var errorMessage;

								var id = item.get('id') || A.guid();
								var size = item.get('sixe') || 0;
								var type = item.get('type') || '';

								var strings = instance.get('strings');

								if ((maxFileSize !== 0) && (size > maxFileSize)) {
									errorMessage = instance._invalidFileSizeText;
								}
								else if (!type) {
									errorMessage = strings.invalidFileNameText;
								}
								else if (size === 0) {
									errorMessage = strings.zeroByteSizeText;
								}

								item.errorMessage = errorMessage;
								item.size = size;
								item.name = item.get('name');
								item.id = id;

								return !errorMessage;
							}
						);
					}
				}
			}
		);

		Liferay.UploadDataValidation = UploadDataValidation;
	},
	'',
	{
		requires: ['liferay-storage-formatter', 'array-extras']
	}
);