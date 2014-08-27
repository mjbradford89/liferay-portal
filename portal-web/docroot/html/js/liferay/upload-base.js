AUI.add(
	'liferay-upload-base',
	function(A) {
		var Lang = A.Lang,
			isBoolean = Lang.isBoolean,
			isString = Lang.isString,

			URL_SWF_UPLOADER = themeDisplay.getPathContext() + '/html/js/aui/uploader/assets/flashuploader.swf',

			STR_BLANK = '',

			timestampParam = '_LFR_UPLOADER_TS' + Lang.now();

		var UploadBase = A.Component.create(
			{
				NAME: 'uploadbase',

				ATTRS: {
					appViewEntryTemplates: {
						validator: A.one,
						value: {}
					},

					dropSelector: {
						validator: isString,
						value: 'body'
					},

					dimensions: {
						value: {}
					},

					displayStyle: {
						validator: isString,
						value: STR_BLANK
					},

					entriesContainer: {
						validator: A.one,
						value: {}
					},

					fileFieldName: {
						value: 'file'
					},

					folderId: {
						getter: function() {
							var instance = this;

							return instance.get('host').getFolderId();
						},
						readonly: true,
						setter: Lang.toInt,
						validator: Lang.isNumber || isString,
						value: null
					},

					host: {
						value: null,
						validator: Lang.isObject
					},

					multipleFiles: {
						validator: isBoolean,
						value: true
					},
					swfURL: {
						value: URL_SWF_UPLOADER
					},
					uploadURL: {
						value: ''
					},

					uploadFile: {
						value: ''
					},

					strings: {
						value: {
							invalidFileSize: Liferay.Language.get('please-enter-a-file-with-a-valid-file-size-no-larger-than-x'),
							invalidFileType: Liferay.Language.get('please-enter-a-file-with-a-valid-file-type'),
							zeroByteFile: Liferay.Language.get('the-file-contains-no-data-and-cannot-be-uploaded.-please-use-the-classic-uploader')
						}
					},
					dragAndDropArea: {
						value: 'body',
						setter: A.one
					},
					viewFileEntryURL: {
						setter: '_decodeURI',
						validator: isString,
						value: STR_BLANK
					}
				},
				EXTENDS: A.Uploader,

				AUGMENTS: [Liferay.UploadDataValidation],

				prototype: {
					initializer: function() {
						var instance = this;

						var strings = instance.get(STRINGS);

						var fallback = instance.get('fallback');

						var useFallback = (location.hash.indexOf(STR_PARAM_FALLBACK) > -1) && fallback;

						if (useFallback ||
							UPLOADER_TYPE == 'none' ||
							(UPLOADER_TYPE == 'flash' && !A.SWFDetect.isFlashVersionAtLeast(10, 1))) {

							if (fallback) {
								fallback.show();
							}
							else {
								instance.one('#fileUpload').append(Lang.sub(TPL_ERROR_MESSAGE, [strings.notAvailableText]));
							}

							instance._preventRenderHandle = instance.on(
								'render',
								function(event) {
									event.preventDefault();
								}
							);
						}
						else {
							var maxFileSize = instance.formatStorage(instance.get('maxFileSize'));

							instance._invalidFileSizeText = Lang.sub(strings.invalidFileSizeText, [maxFileSize]);

							instance._metadataContainer = instance.get('metadataContainer');
							instance._metadataExplanationContainer = instance.get('metadataExplanationContainer');

							instance._fileListBuffer = [];
							instance._renderFileListTask = A.debounce(instance._renderFileList, 10, instance);
						}

						instance._fallback = fallback;
					},

					destructor: function() {

					},

					bindUI: function() {
					},

					_renderUploader: function() {

					},

					_getUploader: function() {

					},

					renderUI: function() {

					},

					_onFileSelect: function(event) {

					}
				}
			}
		);

		Liferay.UploadBase = UploadBase;
	},
	'',
	{
		requires: ['uploader', 'aui-component']
	}
);