AUI.add(
	'liferay-upload-data-validation',
	function(A) {
		var Lang = A.Lang;

		var UploadDataValidation = A.Component.create(
			{
				ATTRS: {
					maxFileSize: {
						validator: Lang.isNumber
					},

					strings: {
						value: {
							invalidFileSize: '',
							invalidFileType: '',
							zeroByteFile: ''
						}
					}
				},

				AUGMENTS: [Liferay.StorageFormatter],

				prototype: {
					validateFiles: function(data) {
						var instance = this;

						var maxFileSize = instance._maxFileSize;

						return A.Array.partition(
							data,
							function(item, index) {
								var errorMessage;

								var size = item.get(STR_SIZE) || 0;
								var type = item.get('type') || STR_BLANK;

								var strings = instance._strings;

								if ((maxFileSize !== 0) && (size > maxFileSize)) {
									errorMessage = sub(strings.invalidFileSize, [instance.formatStorage(instance._maxFileSize)]);
								}
								else if (!type) {
									errorMessage = strings.invalidFileType;
								}
								else if (size === 0) {
									errorMessage = strings.zeroByteFile;
								}

								item.errorMessage = errorMessage;
								item.size = size;
								item.name = item.get(STR_NAME);

								return !errorMessage;
							}
						);
					}
				}
			}

			A.Base.mix(A.UploadBase, [UploadDataValidation]);

		);
	},
	'',
	{
		requires: ['aui-component', 'liferay-storage-formatter', 'liferay-upload-base', 'array-extras']
	}
);