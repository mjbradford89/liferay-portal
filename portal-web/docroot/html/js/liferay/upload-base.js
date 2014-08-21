AUI.add(
	'liferay-upload-base',
	function(A) {
		var Lang = A.Lang,
			isBoolean = Lang.isBoolean,

			URL_SWF_UPLOADER = themeDisplay.getPathContext() + '/html/js/aui/uploader/assets/flashuploader.swf',

			timestampParam = '_LFR_UPLOADER_TS' + Lang.now();

		var UploadBase = A.Component.create(
			{
				NAME: 'uploadbase',
				ATTRS: {
					appViewEntryTemplates: {
						validator: A.one,
						value: {}
					},

					dimensions: {
						value: {}
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
						validator: Lang.isNumber || Lang.isString,
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
						valueFn: function() {
							return Liferay.Util.addParams(timestampParam, URL_SWF_UPLOADER)
						}
					},
					uploadURL: {
						valueFn: function() {
							return Liferay.Util.addParams(timestampParam, this.get('uploadFile'))
						}
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
					}
				},
				EXTENDS: A.Uploader,

				prototype: {
					initializer: function() {
						var dragAndDropArea = A.one(this.get('dragAndDropArea'));

						this.set('dragAndDropArea', dragAndDropArea);

						this.docElement = A.getDoc().get('documentElement');

						this.on('drop', this._onDrop, this);

						this._bindUIFileSelect();

						this.initTemplates();
					},

					_onDrop: function(event) {
						var dataTransfer = event._event.dataTransfer;

						if (dataTransfer) {
							var dataTransferTypes = dataTransfer.types || [];

							if ((AArray.indexOf(dataTransferTypes, 'Files') > -1) && (AArray.indexOf(dataTransferTypes, 'text/html') === -1)) {
								event.halt();

								var dragDropFiles = AArray(dataTransfer.files);

								event.fileList = AArray.map(
									dragDropFiles,
									function(item, index) {
										return new A.FileHTML5(item);
									}
								);

								instance.fire('fileselect', event);
							}
						}
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