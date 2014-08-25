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
					maxFileSize: {
						validator: Lang.isNumber
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

				prototype: {
					initializer: function() {
						var dragAndDropArea = A.one(this.get('dragAndDropArea'));

						this.set('dragAndDropArea', dragAndDropArea);

						this.docElement = A.getDoc().get('documentElement');

						this.bindUI();

						this.initTemplates();
					},

					bindUI: function() {
						this.docElement.delegate('drop', A.bind(this._onDropFile, this), this.get('dropSelector'));

						this.on('fileselect', this._onFileSelect, this);
					},

					initTemplates: function() {},

					_onDropFile: function(event) {
						var instance = this;

						var dataTransfer = event._event.dataTransfer;

						if (dataTransfer) {
							var dataTransferTypes = dataTransfer.types || [];

							// file.size > 0

							if ((A.Array.indexOf(dataTransferTypes, 'Files') > -1) && (A.Array.indexOf(dataTransferTypes, 'text/html') === -1)) {
								event.halt();

								var dragDropFiles = A.Array(dataTransfer.files);

								event.fileList = A.Array.map(
									dragDropFiles,
									function(item) {
										return new A.FileHTML5(item);
									}
								);

								instance.fire('fileselect', event);
							}
						}
					},

					_onFileSelect: function(event) {
						event.stopPropagation();
						console.log(event);
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