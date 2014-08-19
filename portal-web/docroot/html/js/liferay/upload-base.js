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
					fileFieldName: {
						value: 'file'
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
					}
				},
				EXTENDS: A.Uploader,

				prototype: {
					initializer: function() {
						this.docElement = A.getDoc().get('documentElement');

						this.docElement.on('drop', this._onDrop, this);
					},

					_onDrop: function(event) {
						var dataTransfer = event._event.dataTransfer;

						debugger;

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

								instance.fire('fileSelect', event);
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