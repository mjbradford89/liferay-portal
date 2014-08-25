AUI.add(
	'document-library-upload',
	function(A) {
		var AArray = A.Array;
		var Lang = A.Lang;
		var UploaderQueue = A.Uploader.Queue;

		var isNumber = Lang.isNumber;
		var isString = Lang.isString;

		var sub = Lang.sub;

		var DOC = A.config.doc;

		var CSS_ACTIVE_AREA = 'active-area';

		var CSS_ENTRY_DISPLAY_STYLE = 'entry-display-style';

		var CSS_UPLOAD_ERROR = 'upload-error';

		var SELECTOR_DATA_FOLDER = '[data-folder="true"]';

		var SELECTOR_DATA_FOLDER_DATA_TITLE = '[data-folder="true"][data-title]';

		var SELECTOR_ENTRY_LINK = '.entry-link';

		var STR_DOT = '.';

		var SELECTOR_ENTRY_DISPLAY_STYLE = STR_DOT + CSS_ENTRY_DISPLAY_STYLE;

		var STR_BOUNDING_BOX = 'boundingBox';

		var STR_BLANK = '';

		var STR_FIRST = 'first';

		var STR_FOLDER_ID = 'folderId';

		var STR_HOST = 'host';

		var STR_NAME = 'name';

		var STR_SIZE = 'size';

		var STR_SPACE = ' ';

		var DocumentLibraryUpload = A.Component.create(
			{
				ATTRS: {
					appViewEntryTemplates: {
						validator: A.one,
						value: {}
					},

					appViewMove: {
						value: {}
					},

					columnNames: {
						setter: function(val) {
							val.push(STR_BLANK);
							val.unshift(STR_BLANK);

							return val;
						},
						validator: Lang.isArray,
						value: []
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

					folderId: {
						getter: function() {
							var instance = this;

							return instance.get(STR_HOST).getFolderId();
						},
						readonly: true,
						setter: Lang.toInt,
						validator: isNumber || isString,
						value: null
					},

					listViewContainer: {
						validator: A.one,
						value: {}
					},

					maxFileSize: {
						validator: function(val) {
							return (isNumber(val) && (val > 0));
						},
						value: 0
					},

					redirect: {
						validator: isString,
						value: STR_BLANK
					},

					uploadURL: {
						setter: '_decodeURI',
						validator: isString,
						value: STR_BLANK
					},

					viewFileEntryURL: {
						setter: '_decodeURI',
						validator: isString,
						value: STR_BLANK
					}
				},

				AUGMENTS: [Liferay.StorageFormatter],

				EXTENDS: A.Plugin.Base,

				NAME: 'documentlibraryupload',

				NS: 'upload',

				prototype: {
					initializer: function() {
						var instance = this;

						instance._columnNames = instance.get('columnNames');
						instance._dimensions = instance.get('dimensions');
						instance._displayStyle = instance.get('displayStyle');
						instance._entriesContainer = instance.get('entriesContainer');
						instance._maxFileSize = instance.get('maxFileSize');

						instance._handles = [];

						instance._strings = {
							invalidFileSize: Liferay.Language.get('please-enter-a-file-with-a-valid-file-size-no-larger-than-x'),
							invalidFileType: Liferay.Language.get('please-enter-a-file-with-a-valid-file-type'),
							zeroByteFile: Liferay.Language.get('the-file-contains-no-data-and-cannot-be-uploaded.-please-use-the-classic-uploader')
						};

						instance._bindDragDropUI();
					},

					destructor: function() {
						var instance = this;

						if (instance._dataSet) {
							instance._dataSet.destroy();
						}

						if (instance._navigationOverlays) {
							AArray.invoke(instance._navigationOverlays, 'destroy');
						}

						if (instance._uploader) {
							instance._uploader.destroy();
						}

						if (instance._tooltipDelegate) {
							instance._tooltipDelegate.destroy();
						}

						instance._detachSubscriptions();

						(new A.EventHandle(instance._eventHandles)).detach();
					},

					_addFilesToQueueBottom: function(files) {
						var instance = this;

						var queue = instance._getUploader().queue;

						AArray.each(
							files,
							function(item, index) {
								queue.addToQueueBottom(item);
							}
						);
					},

					_attachSubscriptions: function(data) {
						var instance = this;

						var handles = instance._handles;

						var uploader = instance._getUploader();
						var displayStyle = uploader._getDisplayStyle();

						if (data.folder) {
							handles.push(
								uploader.on('alluploadscomplete', uploader._showFolderUploadComplete, uploader, data, displayStyle),
								uploader.on('totaluploadprogress', uploader._showFolderUploadProgress, uploader, data),
								uploader.on('uploadcomplete', uploader._detectFolderUploadError, uploader, data),
								uploader.on('uploadstart', uploader._showFolderUploadStarting, uploader, data)
							);
						}
						else {
							handles.push(
								uploader.after('fileuploadstart', uploader._showFileUploadStarting, uploader),
								uploader.on('uploadcomplete', uploader._showFileUploadComplete, uploader, displayStyle),
								uploader.on('uploadprogress', uploader._showFileUploadProgress, uploader)
							);
						}
					},

					_bindDragDropUI: function() {
						var instance = this;

						var docElement = A.one(DOC.documentElement);

						var entriesContainer = instance._entriesContainer;

						var host = instance.get(STR_HOST);

						A.getWin()._node.onbeforeunload = A.bind('_confirmUnload', instance);

						var onDataRequestHandle = Liferay.on(host.ns('dataRequest'), instance._onDataRequest, instance);

						var removeCssClassTask = A.debounce(
							function() {
								docElement.removeClass('upload-drop-intent');
								docElement.removeClass('upload-drop-active');
							},
							500
						);

						var appViewMove = instance.get('appViewMove');

						if (appViewMove.get('updateable')) {
							var dd = appViewMove._ddHandler.dd;

							dd.addInvalid(STR_DOT + CSS_UPLOAD_ERROR);
						}

						var onDragOverHandle = docElement.on(
							'dragover',
							function(event) {
								var dataTransfer = event._event.dataTransfer;

								var uploader = instance._getUploader();

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
							}
						);

						var entriesDragDelegateHandle = entriesContainer.delegate(
							['dragleave', 'dragover'],
							function(event) {
								var dataTransfer = event._event.dataTransfer;

								var dataTransferTypes = dataTransfer.types;

								if ((AArray.indexOf(dataTransferTypes, 'Files') > -1) && (AArray.indexOf(dataTransferTypes, 'text/html') === -1)) {
									var parentElement = event.target.ancestor(SELECTOR_ENTRY_DISPLAY_STYLE);

									parentElement.toggleClass(CSS_ACTIVE_AREA, (event.type == 'dragover'));
								}
							},
							SELECTOR_DATA_FOLDER
						);

						var entriesClickDelegateHandle = entriesContainer.delegate(
							'click',
							function(event) {
								event.preventDefault();
							},
							STR_DOT + CSS_UPLOAD_ERROR + STR_SPACE + SELECTOR_ENTRY_LINK
						);

						instance._eventHandles = [
							onDataRequestHandle,
							onDragOverHandle,
							entriesDragDelegateHandle,
							entriesClickDelegateHandle
						];
					},

					_combineFileLists: function(fileList, queuedFiles) {
						AArray.each(
							queuedFiles,
							function(item, index) {
								fileList.push(item);
							}
						);
					},

					_confirmUnload: function() {
						var instance = this;

						if (instance._isUploading()) {
							return Liferay.Language.get('uploads-are-in-progress-confirmation');
						}
					},

					_decodeURI: function(val) {
						return decodeURI(val);
					},

					_detachSubscriptions: function() {
						var instance = this;

						var handles = instance._handles;

						AArray.invoke(handles, 'detach');

						handles.length = 0;
					},

					_detectFolderUploadError: function(event, data) {
						var instance = this;

						var response = instance._getUploadResponse(event.data);

						if (response.error) {
							var file = event.file;

							file.errorMessage = response.message;

							data.invalidFiles.push(file);
						}
					},

					_getCurrentUploadData: function() {
						var instance = this;

						var dataSet = instance._getDataSet();

						return dataSet.get(STR_FIRST);
					},

					_getDataSet: function() {
						var instance = this;

						var dataSet = instance._dataSet;

						if (!dataSet) {
							dataSet = new A.DataSet();

							instance._dataSet = dataSet;
						}

						return dataSet;
					},

					_getFolderEntryNode: function(target) {
						var folderEntry;

						var overlayContentBox = target.hasClass('overlay-content');

						if (overlayContentBox) {
							var overlay = A.Widget.getByNode(target);

							folderEntry = overlay._originalConfig.target;
						}
						else {
							if (target.attr('data-folder') === 'true') {
								folderEntry = target;
							}

							if (!folderEntry) {
								folderEntry = target.ancestor(SELECTOR_ENTRY_LINK + SELECTOR_DATA_FOLDER);
							}

							if (!folderEntry) {
								folderEntry = target.ancestor(SELECTOR_DATA_FOLDER_DATA_TITLE);
							}

							folderEntry = folderEntry && folderEntry.ancestor();
						}

						return folderEntry;
					},

					_getTargetFolderId: function(target) {
						var instance = this;

						var folderEntry = instance._getFolderEntryNode(target);

						var dataFolder = folderEntry && folderEntry.one('[data-folder-id]');

						return (dataFolder && Lang.toInt(dataFolder.attr('data-folder-id')) || instance.get(STR_FOLDER_ID));
					},

					_getUploader: function() {
						var instance = this;

						var uploader = instance._uploader;

						if (!uploader) {
							uploader = new Liferay.UploadBase(
								{
									appendNewFiles: false,
									fileFieldName: 'file',
									multipleFiles: true,
									simLimit: 1,
									entriesContainer: instance.get('entriesContainer'),
									host: instance.get(STR_HOST),
									appViewEntryTemplates: instance.get('appViewEntryTemplates'),
									dimensions: instance.get('dimensions'),
									viewFileEntryURL: instance.get('viewFileEntryURL'),
									displayStyle: instance.get('displayStyle'),
									dropSelector: 'body, .document-container, .overlaymask, .progressbar, [data-folder="true"]'
								}
							);

							var navigationOverlays = uploader._getNavigationOverlays();

							uploader.on(
								'uploadstart',
								function(event) {
									AArray.invoke(navigationOverlays, 'show');
								}
							);

							uploader.after(
								'alluploadscomplete',
								function(event) {
									AArray.invoke(navigationOverlays, 'hide');

									var emptyMessage = uploader._getEmptyMessage();

									if (emptyMessage && !emptyMessage.hasClass('hide')) {
										emptyMessage.hide(true);
									}
								}
							);

							uploader.get(STR_BOUNDING_BOX).hide();

							uploader.render();

							uploader.after('alluploadscomplete', instance._startNextUpload, instance);
							uploader.after('fileselect', instance._onFileSelect, instance);

							instance._uploader = uploader;
						}

						return uploader;
					},

					_getUploadStatus: function(key) {
						var instance = this;

						var dataSet = instance._getDataSet();

						return dataSet.item(String(key));
					},

					_getUploadURL: function(folderId) {
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

						return sub(
							uploadURL,
							{
								folderId: folderId
							}
						);
					},

					_isUploading: function() {
						var instance = this;

						var uploader = instance._uploader;

						var queue = uploader && uploader.queue;

						return !!(queue && ((queue.queuedFiles.length > 0) || (queue.numberOfUploads > 0) || !A.Object.isEmpty(queue.currentFiles)) && (queue._currentState == UploaderQueue.UPLOADING));
					},

					_onDataRequest: function(event) {
						var instance = this;

						if (instance._isUploading()) {
							event.halt();
						}
					},

					_onFileSelect: function(event) {
						var instance = this;

						var target = event.details[0].target;

						var filesPartition = instance._uploader.validateFiles(event.fileList);

						instance._uploader._updateStatusUI(instance._getTargetFolderId(target), instance._getFolderEntryNode(target), filesPartition);

						instance._queueSelectedFiles(target, filesPartition);
					},

					_queueSelectedFiles: function(target, filesPartition) {
						var instance = this;

						var key = instance._getTargetFolderId(target);

						var keyData = instance._getUploadStatus(key);

						var validFiles = filesPartition.matches;

						if (keyData) {
							instance._updateDataSetEntry(key, keyData, validFiles);
						}
						else {
							var dataSet = instance._getDataSet();

							var folderNode = null;

							var folder = (key !== instance.get(STR_FOLDER_ID));

							if (folder) {
								folderNode = instance._getFolderEntryNode(target);
							}

							dataSet.add(
								key,
								{
									fileList: validFiles,
									folder: folder,
									folderId: key,
									invalidFiles: filesPartition.rejects,
									target: folderNode
								}
							);
						}

						if (!instance._isUploading()) {
							instance._startUpload();
						}
					},

					_startNextUpload: function(event) {
						var instance = this;

						var uploader = instance._uploader;

						instance._detachSubscriptions();

						uploader._destroyEntry(instance._getCurrentUploadData());

						var dataSet = instance._getDataSet();

						dataSet.removeAt(0);

						if (dataSet.length) {
							instance._startUpload();
						}
					},

					_startUpload: function() {
						var instance = this;

						var uploadData = instance._getCurrentUploadData();

						var fileList = uploadData.fileList;

						var uploader = instance._getUploader();

						if (fileList.length) {
							var uploadURL = instance._getUploadURL(uploadData.folderId);

							instance._attachSubscriptions(uploadData);

							uploader.uploadThese(fileList, uploadURL);
						}
						else {
							uploader.fire('alluploadscomplete');
						}
					},

					_updateDataSetEntry: function(key, data, unmergedData) {
						var instance = this;

						var currentUploadData = instance._getCurrentUploadData();

						if (currentUploadData.folderId === key) {
							instance._addFilesToQueueBottom(unmergedData);
						}
						else {
							instance._combineFileLists(data.fileList, unmergedData);

							var dataSet = instance._getDataSet();

							dataSet.replace(key, data);
						}
					},

					_validateFiles: function(data) {
						var instance = this;

						var maxFileSize = instance._maxFileSize;

						return AArray.partition(
							data,
							function(item, index) {
								var errorMessage;

								var size = item.get(STR_SIZE) || 0;
								var type = item.get('type') || STR_BLANK;

								var strings = instance._strings;

								if ((maxFileSize !== 0) && (size > maxFileSize)) {
									errorMessage = sub(strings.invalidFileSize, [instance.formatStorage(instance._maxFileSize)]);
								}
								else if (!type) {
									errorMessage = strings.invalidFileType;
								}
								else if (size === 0) {
									errorMessage = strings.zeroByteFile;
								}

								item.errorMessage = errorMessage;
								item.size = size;
								item.name = item.get(STR_NAME);

								return !errorMessage;
							}
						);
					}
				}
			}
		);

		Liferay.DocumentLibraryUpload = DocumentLibraryUpload;
	},
	'',
	{
		requires: ['liferay-upload-base', 'liferay-upload-data-validation', 'liferay-upload-ui-base', 'aui-component', 'aui-data-set-deprecated', 'aui-overlay-manager-deprecated', 'aui-overlay-mask-deprecated', 'aui-parse-content', 'aui-progressbar', 'aui-template-deprecated', 'aui-tooltip', 'liferay-app-view-folders', 'liferay-app-view-move', 'liferay-app-view-paginator', 'liferay-app-view-select', 'liferay-search-container', 'liferay-storage-formatter', 'querystring-parse-simple', 'uploader']
	}
);