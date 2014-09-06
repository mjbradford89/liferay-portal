AUI.add(
	'liferay-upload-base',
	function(A) {
		var Lang = A.Lang,

			UploaderQueue = A.Uploader.Queue,

			STR_PARAM_FALLBACK = 'uploader=fallback',

			UPLOADER_TYPE = A.Uploader.TYPE || 'none',

			URL_SWF_UPLOADER = themeDisplay.getPathContext() + '/html/js/aui/uploader/assets/flashuploader.swf';

		var  UploadBase = A.Component.create(
			{

				NAME: 'uploadbase',

				EXTENDS: A.Uploader,

				ATTRS: {
					fallback: {
						setter: A.one,
						value: null
					},

					dataValidation: {
						value: null,
						validator: Lang.isObject
					},

					deleteFileURL: {
						value: ''
					},

					tempRandomSuffix: {
						validator: Lang.isString,
						value: null
					},

					swfURL: {
						getter: function() {
							var timestampParam = '_LFR_UPLOADER_TS=' + Lang.now();

							return Liferay.Util.addParams(timestampParam, URL_SWF_UPLOADER);
						},
						writeOnce: true
					},

					userInterface: {
						value: null,
						validator: Lang.isObject
					},

					namespace: {
						value: '',
						validator: Lang.isString
					},

					tempFileURL: {
						value: ''
					}
				},

				prototype: {
					initializer: function() {
						var instance = this;

						var docElement = A.getDoc().get('documentElement');

						instance._UI = instance.get('userInterface');

						instance._dataValidation = instance.get('dataValidation');

						instance._UI.set('host', instance);

						instance._filesTotal = 0;

						var fallback = instance.get('fallback');

						var useFallback = (location.hash.indexOf(STR_PARAM_FALLBACK) > -1) && fallback;

						if (useFallback ||
							UPLOADER_TYPE == 'none' ||
							(UPLOADER_TYPE == 'flash' && !A.SWFDetect.isFlashVersionAtLeast(10, 1))) {

							if (fallback) {
								fallback.show();
							}
							else {
								instance._UI._handleNotSupported();
							}

							instance._preventRenderHandle = instance.on(
								'render',
								function(event) {
									event.preventDefault();
								}
							);
						}
						else {
							instance._fileListBuffer = [];
							instance._renderFileListTask = A.debounce(instance._UI._renderFileList, 10, instance._UI);

							instance._fallback = fallback;

							instance._UI.renderUI();

							instance.get('boundingBox').setContent(instance._UI._uploadFragment);

							instance.bindEvents();

							instance._UI.bindUI();

							instance.removeCssClassTask = A.debounce(
								function() {
									docElement.removeClass('upload-drop-intent');
									docElement.removeClass('upload-drop-active');
								},
								500
							);
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
							instance.on('alluploadscomplete', instance._onAllUploadsComplete, instance),
							instance.on('uploadcomplete', instance._onUploadComplete, instance),
							instance.on('totaluploadprogress', instance._onTotalUploadProgress, instance),
							instance.on('fileuploadstart', instance._UI._onFileUploadStart, instance._UI),
							instance.on('uploadprogress', instance._UI._onUploadProgress, instance._UI),
							instance.after('fileselect', instance._onFileSelect, instance),
							A.getWin().on('beforeunload', instance._onBeforeUnload, instance),
							instance.on('cancelFile', instance._onCancelFile, instance)
						];
					},

					_onAllUploadsComplete: function(event) {
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
											instance._UI._handleDeleteResponse(event, fileName);
										},
										success: function(event) {
											instance._UI._handleDeleteResponse(this.get('responseData'), fileName);
										}
									}
								}
							);
						}
						else {
							instance._UI._handleDeleteResponse();
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

						instance._renderFileListTask();

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

					_isUploading: function() {
						var instance = this;

						var queue = instance.queue;

						return !!(queue && (queue.queuedFiles.length > 0 || queue.numberOfUploads > 0 || !A.Object.isEmpty(queue.currentFiles)) && queue._currentState === UploaderQueue.UPLOADING);
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