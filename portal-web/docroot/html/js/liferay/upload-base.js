AUI.add(
	'liferay-upload-base',
	function(A) {
		var Lang = A.Lang,

			EMPTY_FN = Lang.emptyFn,

			UploaderQueue = A.Uploader.Queue,

			STR_PARAM_FALLBACK = 'uploader=fallback',

			UPLOADER_TYPE = A.Uploader.TYPE || 'none';

		var  UploadBase = A.Component.create(
			{

				NAME: 'uploadbase',

				EXTENDS: A.Uploader,

				prototype: {
					initializer: function() {
						console.log('initializer');
						var instance = this;

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
								//not sure what this does or if it is still needed
								//instance.one('#fileUpload').append(Lang.sub(TPL_ERROR_MESSAGE, [strings.notAvailableText]));
							}

							//if using the fallback uploader, prevent rendering??
							instance._preventRenderHandle = instance.on(
								'render',
								function(event) {
									event.preventDefault();
								}
							);
						}

						instance._fileListBuffer = [];
						instance._renderFileListTask = A.debounce(instance._renderFileList, 10, instance);

						instance._fallback = fallback;

						instance.bindEvents();
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
							instance.on('fileuploadstart', instance._onFileUploadStart, instance),
							instance.on('uploadcomplete', instance._onUploadComplete, instance),
							instance.on('uploadprogress', instance._onUploadProgress, instance),
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
									data: instance.ns(
										{
											fileName: fileName
										}
									),
									dataType: 'JSON',
									on: {
										failure: function(event, id, obj) {
											instance._handleDeleteResponse(event, id, obj);
										},
										success: function(event, id, obj) {
											//instance._handleDeleteResponse(this.get('responseData'), id, obj);
										}
									}
								}
							);
						}
						else {
							instance._handleDeleteResponse();
						}
					},

					_onFileSelect: function(event) {
						var instance = this;

						var fileList = event.fileList;

						var validFiles = instance._getValidFiles(fileList);

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

					_onUploadComplete: function(event) {
						var instance = this;

						var file = event.file;

						var fileId = file.id;

						var data = event.data;

						try {
							data = A.JSON.parse(data);
						}
						catch (err) {
						}
					},

					//TODO move to data validation
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

								instance._queueFile(item);

								return file;
							}
						);
					},

					_queueFile: EMPTY_FN,

					//TODO override in ui-base
					//_onUploadStart: function(event) {this.get('host')._onUploadStart(event);},
					_onFileUploadStart: EMPTY_FN,
					_onUploadProgress: EMPTY_FN,
					//_onTotalUploadProgress: function(event) {this.get('host')._onUploadComplete(event);},
					_handleDeleteResponse: EMPTY_FN,

					_isUploading: function() {
						var instance = this;

						var queue = instance.queue;

						return !!(queue && (queue.queuedFiles.length > 0 || queue.numberOfUploads > 0 || !A.Object.isEmpty(queue.currentFiles)) && queue._currentState === UploaderQueue.UPLOADING);
					},

					cancelAll: function() {
						var instance = this;

						var queue = instance.queue;

						var fileList = queue.get('fileList');

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
								message = instance.ns('fileEntryId=') + responseData.fileEntryId;
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