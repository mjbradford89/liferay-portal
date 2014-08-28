AUI.add(
	'liferay-upload-base',
	function(A) {
		var Lang = A.Lang,

			UploaderQueue = A.Uploader.Queue,

			STR_PARAM_FALLBACK = 'uploader=fallback',

			UPLOADER_TYPE = A.Uploader.TYPE || 'none';

		function UploadBase() {}

		UploadBase.proptotype = {
			initializer: function() {
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
				else {
					/* TODO: move to upload-data-validation.js
					var maxFileSize = instance.formatStorage(instance.get('maxFileSize'));

					instance._invalidFileSizeText = Lang.sub(strings.invalidFileSizeText, [maxFileSize]);*/

					instance._metadataContainer = instance.get('metadataContainer');
					instance._metadataExplanationContainer = instance.get('metadataExplanationContainer');

					instance._fileListBuffer = [];
					instance._renderFileListTask = A.debounce(instance._renderFileList, 10, instance);
				}

				instance._fallback = fallback;

				instance.bindEvents();
			},

			destructor: function() {
				var instance = this;

				if (instance._uploaderHandles) {
					(new A.EventHandle(instance._uploaderHandles)).detach();
				}
			},

			//override in ui-base
			initUI: function() {},

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
					Liferay.after('filesSaved', instance._afterFilesSaved, instance),
				];
			},

			_onAllUploadsComplete: function(event) {
				var instance = this;

				instance.set('enabled', true);

				instance.set('fileList', []);
			},

			_onBeforeUnload: function(event) {
				var instance = this;

				if (instance._isUploading()) {
					event.preventDefault();
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
									instance._handleDeleteResponse(this.get('responseData'), id, obj);
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
						instance.uploadAll();
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

			//TODO override in data validation
			_getValidFiles: function() {},

			//TODO override in ui-base
			_onUploadStart: function() {},
			_onFileUploadStart: function() {},
			_onUploadProgress: function() {},
			_afterFilesSaved: function() {},
			_onTotalUploadProgress: function() {},
			_handleDeleteResponse: function() {},

			_handleDrop: function(event) {
				var instance = this;

				event.halt();

				var target = event.target;

				var dataTransfer = event._event.dataTransfer;

				var dragDropFiles = dataTransfer && A.Array(dataTransfer.files);

				if (dragDropFiles) {
					event.fileList = A.Array.map(
						dragDropFiles,
						function(item, index) {
							return new A.FileHTML5(item);
						}
					);

					instance.fire('fileselect', event);
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

				var fileList = queue.get('fileList');

				queue.pauseUpload();

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
						message = instance.get('host').ns('fileEntryId=') + responseData.fileEntryId;
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


/*			TODO:  override this method in uploader-ui-base
			renderUI: function() {
				var instance = this;

				instance._renderControls();
				instance._renderUploader();
			},*/

/*			TODO: override this method in uploader-ui-base
			bindUI: function() {
			},*/

		};

		UploadBase.ATTRS= {
			fallback: {
				setter: A.one,
				value: null
			}
		};

		Liferay.UploadBase = UploadBase;

		A.extend(Liferay.UploadBase, A.Uploader);
	},
	'',
	{
		requires: ['uploader', 'aui-component']
	}
);