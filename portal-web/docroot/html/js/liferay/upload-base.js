AUI.add(
	'liferay-upload-base',
	function(A) {
		var Lang = A.Lang;
		var AArray = A.Array;

		var docElement = A.one(A.config.doc.documentElement);

		var removeCssClassTask = A.debounce(
			function() {
				docElement.removeClass('upload-drop-intent');
				docElement.removeClass('upload-drop-active');
			},
			500
		);

		var UploadBase = A.Component.create(
			{
				ATTRS: {
					dropTargets: {
						validator: Lang.isString,
						// DM configuration: value: 'body, .document-container, .overlaymask, .progressbar, [data-folder="true"]'
						value: 'body'
					},

					// replaced this with uploadItemsIntent
					//
					// fileList: {
					// 	setter: function(val) {
					// 		var instance = this;

					// 		instance._getUploader().set('fileList', val);

					// 		return val;
					// 	},
					// 	validator: Lang.isArray,
					// 	value: []
					// },

					fileFieldName: {
						validator: Lang.isString,
						value: 'file'
					},

					maxFileSize: {
						setter: function(val) {
							var maxFileSize = Lang.toInt(val);

							return instance.formatStorage(maxFileSize);
						},
						value: 0
					},

					multipleFiles: {
						validator: Lang.isBoolean,
						value: true
					},

					render: {
						value: true
					},

					strings: {
						validator: Lang.isObject,
						value: {
							invalidFileNameText: Liferay.Language.get('please-enter-a-file-with-a-valid-file-name'),
							invalidFileSizeText: Liferay.Language.get('please-enter-a-file-with-a-valid-file-size-no-larger-than-x'),
							invalidFileType: Liferay.Language.get('please-enter-a-file-with-a-valid-file-type'),
							zeroByteSizeText: Liferay.Language.get('the-file-contains-no-data-and-cannot-be-uploaded.-please-use-the-classic-uploader'),
						}
					},

					swfURL: {
						setter: '_addTimeStampParam',
						validator: Lang.isString,
						value: themeDisplay.getPathContext() + '/html/js/aui/uploader/assets/flashuploader.swf'
					},

					uploadURL: {
						setter: '_addTimeStampParam',
						validator: Lang.isString,
						value: ''
					}
				},
				NAME: 'uploadbase',
				prototype: {

					initializer: function() {
						var instance = this;

						docElement.on('dragover', instance._onDragOver);
						docElement.delegate('drop', instance._onDrop, instance.get('dropTargets'));

						A.getWin().on('beforeunload', instance._onBeforeUnload, instance);
					},

					destructor: function() {
						var instance = this;

						if (instance._uploader) {
							instance._uploader.destroy();
						}
					},

					_getUploader: function() {
						var instance = this;

						var uploader = instance._uploader;

						if (!uploader) {
							uploader = instance._createUploader();

							instance._uploader = uploader;
						}

						return uploader;
					},

					_getRouter: function() {
						var instance = this;

						var router = instance._router;

						if (!router) {
							var uploader = instance._getUploader();

							var routes = {};
							var queue = {};

							router = {
								send: function(items, location) {
									// if uploading

										// find the route

										// if the route is new, create it

										// add this to our queue

									// else
									uploader.set('fileList', items);

									if (instance._isUploading()) {
										// var queue = instance.
										var queue = this.queue;

										AArray.each(items, queue.addToQueueBottom, queue);
									}
									else {
										uploader.uploadAll();
									}
								}
								// queue: uploader.queue
							};

							intance.router = router;
						}

						return router;
					},

					_getLocation: function() {
						var instance = this;

						var location;

						// todo

						return location;
					},

					upload: function(items, location) {
						var instance = this;

						location = location || instance._getLocation();

						instance.router.send(items, location);
					},

					// uploadAll: function() {
					// 	var instance = this;

					// 	var uploader = instance._getUploader();

					// 	if (!instance._isUploading()) {
					// 		uploader.uploadAll();
					// 	}
					// },

					uploadThese: function() {
						var instance = this;

						var uploader = instance._getUploader();

						uploader.uploadThese();
					},

					_addTimeStampParam: function(val) {
						var instance = this;

						var timeStampParam = '_LFR_UPLOADER_TS=' + Lang.now();

						return Liferay.Util.addParams(timeStampParam, val);
					},

					_createUploader: function() {
						var instance = this;

						var config = A.mix(A.Object(A.Uploader.ATTRS), instance.getAttrs(), true);

						var uploader = new A.Uploader(config).render();

						uploader.once(
							'render',
							function(event) {
								instance.publish(
									'init',
									{
										prefix: 'uploader',
										context: uploader
									}
								);
							}
						);

						// instance.on('destroy', uploader.destroy); // will this work?
						// instance.on('destroy', uploader.destroy, uploader); // will that work?

						return uploader;
					},

					_onBeforeUnload: function(event) {
						var instance = this;

						if (instance._isUploading()) {
							event.preventDefault();
						}
					},

					_isUploading: function() {
						var instance = this;

						var uploader = instance._uploader;

						var queue = uploader && uploader.queue;

						return !!(queue && (queue.queuedFiles.length > 0 || queue.numberOfUploads > 0 || !A.Object.isEmpty(queue.currentFiles)) && queue._currentState === UploaderQueue.UPLOADING);
					},

					_onDragOver: function(event) {
						var dataTransfer = event._event.dataTransfer;

						if (dataTransfer && dataTransfer.types) {
							var dataTransferTypes = dataTransfer.types || [];

							if ((AArray.indexOf(dataTransferTypes, 'Files') > -1) && (AArray.indexOf(dataTransferTypes, 'text/html') === -1)) {
								event.halt();

								dataTransfer.dropEffect = 'copy';

								docElement.addClass('upload-drop-intent');

								var target = event.target;

								docElement.toggleClass('upload-drop-active', (target.compareTo(entriesContainer) || entriesContainer.contains(target)));

								removeCssClassTask();
							}
						}
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

								var uploader = instance._getUploader();

								uploader.fire('fileselect', event);
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
		requires: ['uploader']
	}
);