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
							instance.on('totaluploadprogress', instance._onTotalUploadProgress, instance),
							instance.on('uploadstart', instance._onUploadStart, instance),
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

						var validFiles = instance._dataValidation.getValidFiles(fileList);

						A.each(
							validFiles,
							function(item, index) {
								instance._fileListBuffer.push(item);
							}
						);

						instance._renderFileListTask();

						var validFilesLength = validFiles.length;

						if (validFilesLength) {
							instance.set('fileList', validFiles);

							instance._filesTotal += validFilesLength;

							if (instance._isUploading()) {
								var uploadQueue = instance.queue;

								A.Array.each(validFiles, uploadQueue.addToQueueBottom, uploadQueue);

								instance.fire('addFilesToQueue', {
									validFiles: validFiles,
									uploadQueue: uploadQueue
								});
							}
							else {
								instance.uploadAll(instance.get('uploadURL'));
							}
						}
					},

/*					//TODO move to data validation
					_getValidFiles: function(data) {
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

								instance._fileListBuffer.push(file);

								instance._renderFileListTask();

								return file;
							}
						);
					},*/

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
					},

					_getUploadResponse: function(responseData) {
						var instance = this;

						var error;
						var message;

						try {
							responseData = A.JSON.parse(responseData);
						}
						catch (err) {
						}

						if (Lang.isObject(responseData)) {
							error = responseData.status && (responseData.status >= 490 && responseData.status < 500);

							if (error) {
								message = responseData.message;
							}
							else {
								message = Liferay.Util.ns(instance.get('namespace', 'fileEntryId=')) + responseData.fileEntryId;
							}
						}

						return {
							error: error,
							message: message
						};
					},

					getUploaderURL: function(folderId) {
						var instance = this;

						var uploadURL = instance._uploadURL;

						if (!uploadURL) {
							var redirect = instance.get('redirect');

							uploadURL = instance.get('uploadURL');

							instance._uploadURL = Liferay.Util.addParams(
								{
									redirect: redirect,
									ts: Lang.now()
								},
								uploadURL
							);
						}

						return Lang.sub(
							uploadURL,
							{
								folderId: folderId
							}
						);
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