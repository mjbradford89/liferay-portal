AUI.add(
	'liferay-upload-base',
	function(A) {
		var Lang = A.Lang,

			isObject = Lang.isObject,
			isString = Lang.isString,

			UploaderQueue = A.Uploader.Queue,

			STR_PARAM_FALLBACK = 'uploader=fallback',

			STR_BLANK = '',

			UPLOADER_TYPE = A.Uploader.TYPE || 'none',

			URL_SWF_UPLOADER = themeDisplay.getPathContext() + '/html/js/aui/uploader/assets/flashuploader.swf';

		var  UploadBase = A.Component.create(
			{

				NAME: 'uploadbase',

				EXTENDS: A.Uploader,

				ATTRS: {
					dataValidation: {
						value: null,
						validator: isObject
					},

					deleteFileURL: {
						value: ''
					},

					namespace: {
						value: '',
						validator: isString
					},

					swfURL: {
						getter: function() {
							var timestampParam = '_LFR_UPLOADER_TS=' + Lang.now();

							return Liferay.Util.addParams(timestampParam, URL_SWF_UPLOADER);
						},
						writeOnce: true
					},

					tempFileURL: {
						value: ''
					},

					tempRandomSuffix: {
						validator: isString,
						value: null
					},

					userInterface: {
						value: null,
						validator: isObject
					},

					uploadURL: {
						setter: '_decodeURI',
						validator: isString,
						value: STR_BLANK
					}
				},

				prototype: {
					initializer: function() {
						var instance = this;

						instance.NS = instance.get('namespace');

						instance._UI = instance.get('userInterface');

						instance._dataValidation = instance.get('dataValidation');

						instance._UI.set('base', instance);

						instance._filesTotal = 0;

						var fallback = instance.get('fallback');

						var useFallback = (location.hash.indexOf(STR_PARAM_FALLBACK) > -1) && fallback;

						if (useFallback ||
							UPLOADER_TYPE == 'none' ||
							(UPLOADER_TYPE == 'flash' && !A.SWFDetect.isFlashVersionAtLeast(10, 1))) {

							instance._UI.renderFallback(fallback);
						}
						else {
							instance._fileListBuffer = [];

							instance.bindEvents();

							instance._UI.renderUI(instance.get('boundingBox'));

							instance._UI.bindUI();
						}
					},

					destructor: function() {
						var instance = this;

						if (instance._uploaderHandles) {
							(new A.EventHandle(instance._uploaderHandles)).detach();
						}
					},

					bindEvents: function() {
						var instance = this;

						instance._uploaderHandles = [
							instance.after('alluploadscomplete', instance._afterAllUploadsComplete, instance),
							instance.on('uploadcomplete', instance._onUploadComplete, instance),
							instance.on('totaluploadprogress', instance._onTotalUploadProgress, instance),
							instance.after('fileselect', instance._onFileSelect, instance),
							A.getWin().on('beforeunload', instance._onBeforeUnload, instance),
							instance.on('cancelFile', instance._onCancelFile, instance)
						];
					},

					cancelAll: function() {
						var instance = this;

						var queue = instance.queue;

						A.each(
							queue.queuedFiles,
							function(item, index) {
								instance._cancelFile(item);
							}
						);

						queue.cancelUpload();

						instance.queue = null;
					},

					_addFilesToQueueBottom: function(files) {
						var instance = this;

						var uploadQueue = instance.queue;

						if (uploadQueue) {
							A.Array.each(files, uploadQueue.addToQueueBottom, uploadQueue);
						}
						else {
							instance.uploadThese(files);
						}
					},

					_cancelFile: function(file) {
						var instance = this;

						var queue = instance.queue;

						if (file) {
							queue.cancelUpload(file);
						}

						if (queue.queuedFiles.length === 0 && queue.numberOfUploads <= 0) {
							instance.queue = null;
						}
					},

					_decodeURI: function(val) {
						return decodeURI(val);
					},

					_deleteFile: function(fileName) {
						var instance = this;

						var deleteFileURL = instance.get('deleteFileURL');

						if (deleteFileURL) {
							A.io.request(
								deleteFileURL,
								{
									data: Liferay.Util.ns(instance.get('namespace'),
										{
											fileName: fileName
										}
									),
									dataType: 'JSON',
									on: {
										failure: function(event) {
											instance._deleteFileResponseHandler(event, fileName);
										},
										success: function(event) {
											instance._deleteFileResponseHandler(event, fileName, this.get('responseData'));
										}
									}
								}
							);
						}
						else {
							instance._deleteFileResponseHandler(null, fileName);
						}
					},

					_deleteFileResponseHandler: function(event, fileName, responseData) {
						var instance = this;

						instance.fire(Liferay.Util.ns(instance.NS, 'deleteFileResponse'),
							{
								originalEvent: event,
								fileName: fileName,
								json: responseData
							}
						);
					},

					_isUploading: function() {
						var instance = this;

						var queue = instance.queue;

						return !!(queue && (queue.queuedFiles.length > 0 || queue.numberOfUploads > 0 || !A.Object.isEmpty(queue.currentFiles)) && queue._currentState === UploaderQueue.UPLOADING);
					},

					_afterAllUploadsComplete: function(event) {
						var instance = this;

						instance.set('enabled', true);

						instance.set('fileList', []);

						Liferay.fire('allUploadsComplete');
					},

					_onBeforeUnload: function(event) {
						var instance = this;

						if (instance._isUploading()) {
							event.preventDefault();
						}
					},

					_onCancelFile: function(event) {
						var instance = this;

						var file = event.file;

						if (file) {
							instance._cancelFile(file);
						}
					},

					_onFileSelect: function(event) {
						var instance = this;

						var fileList = event.fileList;

						var filesPartition = instance._dataValidation.getValidFiles(fileList);

						event.filesPartition = filesPartition;

						A.each(
							filesPartition.matches,
							function(item, index) {
								instance._fileListBuffer.push(item);
							}
						);

						var validFilesLength = filesPartition.matches.length;

						if (validFilesLength) {
							instance.set('fileList', filesPartition.matches);

							instance._filesTotal += validFilesLength;

							if (instance._isUploading()) {
								instance._addFilesToQueueBottom(filesPartition.matches);
							}
							else {
								instance.uploadAll(instance.get('uploadURL'));
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