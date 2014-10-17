AUI.add(
	'document-library-upload-folders',
	function(A) {
		var AArray = A.Array;
		var Lang = A.Lang;

		var isString = Lang.isString;

		var CSS_ENTRY_DISPLAY_STYLE = 'entry-display-style';

		var CSS_TAGLIB_ICON = 'taglib-icon';

		var STR_DOT = '.';

		var SELECTOR_TAGLIB_ICON = STR_DOT + CSS_TAGLIB_ICON;

		var PATH_THEME_IMAGES = themeDisplay.getPathThemeImages();

		var SELECTOR_ENTRY_LINK = '.entry-link';

		var STR_BLANK = '';

		var SELECTOR_ENTRY_DISPLAY_STYLE = STR_DOT + CSS_ENTRY_DISPLAY_STYLE;

		var STR_LIST = 'list';

		var STR_SPACE = ' ';

		var STR_THUMBNAIL_EXTENSION = '.png';

		var STR_THUMBNAIL_DEFAULT = 'default' + STR_THUMBNAIL_EXTENSION;

		var STR_THUMBNAIL_FULL_FOLDER = 'folder_full_document' + STR_THUMBNAIL_EXTENSION;

		var STR_THUMBNAIL_EMPTY_FOLDER = 'folder_empty_document' + STR_THUMBNAIL_EXTENSION;

		var STR_THUMBNAIL_PATH = PATH_THEME_IMAGES + '/file_system/large/';

		if (!window.requestFileSystem && !window.webkitRequestFileSystem) {
			return;
		}

		var DocumentLibraryFolderUpload = A.Component.create(
			{
				ATTRS: {
					viewFolderEntryURL: {
						setter: '_decodeURI',
						validator: isString,
						value: STR_BLANK
					}
				},

				NAME: 'DocumentLibraryFolderUpload',

				NS: 'DocumentLibraryFolderUpload',

				EXTENDS: Liferay.DocumentLibraryUpload,

				prototype: {
					_attachSubscriptions: function(data) {
						var instance = this;

						if (data.uploadFileTreeFn) {
							var handles = instance._handles;

							var uploader = instance._getUploader();
							var displayStyle = instance._getDisplayStyle();

							handles.push(
								uploader.on('uploadcomplete', instance._showItemUploadComplete, instance, data, displayStyle),
								uploader.once('fileuploadstart', instance._showDirectoryUploadStarting, instance, data),
								instance.on('directoryUploadComplete', instance._showDirectoryUploadComplete, instance, data, displayStyle)
							);
						}
						else {
							DocumentLibraryFolderUpload.superclass._attachSubscriptions.apply(instance, arguments);
						}
					},

					_getFolderThumbnail: function(isEmpty) {
						var thumbnailName = STR_THUMBNAIL_DEFAULT;

						if (isEmpty) {
							thumbnailName = STR_THUMBNAIL_EMPTY_FOLDER;
						}
						else {
							thumbnailName = STR_THUMBNAIL_FULL_FOLDER;
						}

						return STR_THUMBNAIL_PATH + thumbnailName;
					},

					_onDrop: function(event) {
						event.preventDefault();

						var instance = this;

						var orginalEvent = event._event;

						var dataTransfer = orginalEvent.dataTransfer;

						var dataTransferTypes = dataTransfer.types || [];

						if ((AArray.indexOf(dataTransferTypes, 'Files') > -1) && (AArray.indexOf(dataTransferTypes, 'text/html') === -1)) {
							event.halt();

							var items = dataTransfer.items;

							if (items) {
								instance._rejectedFileTreeItems = [];
								instance._directoryUploadsComplete = 0;
								instance._directoryUploadsInProgress = 0;

								event.itemList = AArray.map(
									AArray(items),
									function(item, index) {
										var entryItem = item.webkitGetAsEntry();

										if (entryItem.isDirectory) {
											entryItem.isEmpty = true;

											event.uploadFileTreeFn = A.rbind(instance._uploadFileTree, instance, entryItem);
										}
										else if (entryItem.isFile) {
											var file = item.getAsFile();

											entryItem = new A.FileHTML5(file);
										}
										else {
											return;
										}

										return entryItem;
									}
								);

								if (event.itemList) {
									var uploader = instance._getUploader();

									uploader.fire('fileselect', event);
								}
							}
							else {
								DocumentLibraryFolderUpload.superclass._onDrop.apply(instance, arguments);
							}
						}
					},

					_showItemUploadComplete: function(event, uploadData, displayStyle) {
						var instance = this;

						var item = uploadData.itemList[0];

						var progressBar = item.progressBar;

						instance._directoryUploadsComplete++;

						if (instance._directoryUploadsInProgress) {
						 	var	percentLoaded = instance._directoryUploadsComplete / instance._directoryUploadsInProgress * 100;

						 	instance._updateProgress(progressBar, percentLoaded);

						 	if (percentLoaded == 100) {
						 		instance._showDirectoryUploadComplete(event, uploadData, displayStyle);
						 	}
						}
					},

					_showDirectoryUploadStarting: function(event, uploadData) {
						var instance = this;

						var directory = uploadData.itemList[0];

						instance._positionProgressBar(directory.overlay, directory.progressBar);
					},

					_showDirectoryUploadComplete: function(event, uploadData, displayStyle) {
						var instance = this;

						var item = uploadData.itemList[0];

						instance._updateDirectoryUploadUI(item, displayStyle, item.isEmpty, uploadData.folder);

						instance._startNextUpload();

						instance._displayResult(item.target, displayStyle, false);

						instance._showFileTreeErrorMessages();
					},

					_showFileTreeErrorMessages: function() {
						var instance = this;

						var fileTreeNotification = instance.get('host').byId('fileTreeNotification');

						var errorMessagesText = '';

						if (instance._rejectedFileTreeItems.length) {
							AArray.each(
								instance._rejectedFileTreeItems,
								function(item, index) {
									errorMessagesText += '<li>' + item.path + ': ' + item.file.errorMessage + '</li>';
								}
							);

							fileTreeNotification.one('ul').html(errorMessagesText);

							fileTreeNotification.removeClass('hide');
						}
					},

					_updateDirectoryUploadUI: function(item, displayStyle, isEmpty, folder) {
						var instance = this;

						if (!folder) {
							instance._updateFolderLink(item.target, instance._rootDirectoryId, displayStyleList);
						}

						var displayStyleList = (displayStyle == STR_LIST);

						if (!displayStyleList) {
							instance._updateFolderThumbnail(item.target, isEmpty);
						}

						item.progressBar.destroy();

						item.overlay.hide();

						var emptyMessage = instance._getEmptyMessage();

						if (emptyMessage && !emptyMessage.hasClass('hide')) {
							emptyMessage.hide(true);
						}
					},

					_updateFolderLink: function(node, id, displayStyleList) {
						var instance = this;

						var selector = SELECTOR_ENTRY_LINK;

						if (displayStyleList) {
							selector = SELECTOR_ENTRY_DISPLAY_STYLE + STR_SPACE + SELECTOR_TAGLIB_ICON;
						}

						var link = node.one(selector);

						if (link) {
							link.attr('href',
								Lang.sub(
									instance.get('viewFolderEntryURL'),
										{
											folderId: id
										}
								)
							);
						}
					},

					_updateFolderThumbnail: function(node, isEmpty) {
						var instance = this;

						var imageNode = node.one('img');

						var thumbnailPath = instance._getFolderThumbnail(isEmpty);

						imageNode.attr('src', thumbnailPath);
					},

					_uploadFileTree: function(treeNode, folderId) {
						var instance = this;

						return new A.Promise(function (resolve, reject) {
							if (treeNode.isFile) {
								treeNode.file(
									function(file) {
										var fileHTML5 = new A.FileHTML5(file);

										var uploader = instance._getUploader();

										var uploadURL = instance._getUploadURL(folderId);

										if (instance._validateItem(fileHTML5)) {
											instance._directoryUploadsInProgress++;

											uploader.upload(fileHTML5, uploadURL);

											uploader.once('uploadcomplete',
												function(event) {
													resolve(treeNode);
												}
											);
										}
										else {
											instance._rejectedFileTreeItems.push(
												{
													file: fileHTML5,
													path: treeNode.fullPath
												}
											);
										}
									}
								);
							}
							else if (treeNode.isDirectory) {
								if (instance._validateDirectory(treeNode, folderId)) {
									Liferay.Service(
										'/dlapp/add-folder',
										{
											description: null,
											name: treeNode.name.trim(),
											parentFolderId: folderId,
											repositoryId: instance.get('host').repositoryId
										},
										function(response) {
											var directoryReader = treeNode.createReader();

											if (response.parentFolderId == instance.get('folderId')) {
												instance._rootDirectoryId = response.folderId;
											}

											directoryReader.readEntries(
												function(entries) {
													var promises = AArray.map(
														entries,
														function(item, index) {
															treeNode.isEmpty = false;

															return instance._uploadFileTree(item, response.folderId);
														}
													);

													A.Promise.all(promises).then(resolve);
												}
											);
										}
									);
								}
								else {
									instance._rejectedFileTreeItems.push(
										{
											file: treeNode,
											path: treeNode.fullPath
										}
									);

									treeNode.target.remove();

									resolve(treeNode);
								}
							}
						});
					},

					_uploadThese: function(uploadData) {
						var instance = this;

						var itemList = uploadData.itemList;

						var uploader = instance._getUploader();

						var uploadFileTreeFn = uploadData.uploadFileTreeFn;

						var uploadURL = instance._getUploadURL(uploadData.folderId);

						if (uploadFileTreeFn) {
							uploadFileTreeFn(uploadData.itemList[0], uploadData.folderId).then(
								function() {
									instance.fire('directoryUploadComplete');
								}
							);
						}
						else {
							uploader.uploadThese(itemList, uploadURL);
						}
					},

					_validateDirectory: function(directory, folderId) {
						var instance = this;

						var entry = directory.target;

						var isValid = true;

						if (folderId === instance.get('folderId')) {
							var entriesWithSameName = instance._entriesContainer.all('[data-title="' + directory.name + '"]');

							entriesWithSameName.each(
								function(item, index) {
									if (!item.compareTo(entry)) {
										isValid = false;

										directory.errorMessage = Liferay.Language.get('please-enter-a-unique-folder-name');
									}
								}
							);
						}

						return isValid;
					}
				}
			}
		);

		Liferay.DocumentLibraryUpload = DocumentLibraryFolderUpload;

	},
	'',
	{
		requires: ['file-html5', 'promise', 'document-library-upload']
	}
);