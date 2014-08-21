AUI.add(
	'liferay-upload-ui-base',
	function(A) {
		var Lang = A.Lang,
			sub = Lang.sub,

			CSS_ACTIVE_AREA = 'active-area',

			CSS_APP_VIEW_ENTRY = 'app-view-entry-taglib',

			CSS_ENTRY_DISPLAY_STYLE = 'entry-display-style',

			CSS_ICON = 'icon',

			CSS_TAGLIB_ICON = 'taglib-icon',

			CSS_TAGLIB_TEXT = 'taglib-text',

			CSS_UPLOAD_ERROR = 'upload-error',

			CSS_UPLOAD_SUCCESS = 'upload-success',

			CSS_UPLOAD_WARNING = 'upload-warning',

			ERROR_RESULTS_MIXED = 1,

			PATH_THEME_IMAGES = themeDisplay.getPathThemeImages(),

			REGEX_AUDIO = /\.(aac|auif|bwf|flac|mp3|mp4|m4a|wav|wma)$/i,

			REGEX_COMPRESSED = /\.(dmg|gz|tar|tgz|zip)$/i,

			REGEX_IMAGE = /\.(bmp|gif|jpeg|jpg|png|tiff)$/i,

			REGEX_VIDEO = /\.(avi|flv|mpe|mpg|mpeg|mov|m4v|ogg|wmv)$/i,

			SELECTOR_DATA_FOLDER = '[data-folder="true"]',

			SELECTOR_DATA_FOLDER_DATA_TITLE = '[data-folder="true"][data-title]',

			SELECTOR_DISPLAY_DESCRIPTIVE = '.display-descriptive',

			SELECTOR_DISPLAY_ICON = '.display-icon',

			SELECTOR_DOCUMENT_ENTRIES_PAGINATION = '.document-entries-pagination',

			SELECTOR_ENTRIES_EMPTY = '.entries-empty',

			SELECTOR_ENTRY_LINK = '.entry-link',

			SELECTOR_ENTRY_TITLE_TEXT = '.entry-title-text',

			SELECTOR_IMAGE_ICON = 'img.icon',

			SELECTOR_SEARCH_CONTAINER = '.searchcontainer',

			STR_DOT = '.',

			SELECTOR_ENTRY_DISPLAY_STYLE = STR_DOT + CSS_ENTRY_DISPLAY_STYLE,

			STR_BLANK = '',

			STR_BOUNDING_BOX = 'boundingBox',

			STR_CONTENT_BOX = 'contentBox',

			STR_HOST = 'host',

			STR_EXTENSION_PDF = '.pdf',

			STR_FOLDER_ID = 'folderId',

			STR_LABEL = 'label',

			STR_LIST = 'list',

			STR_NAME = 'name',

			STR_NAVIGATION_OVERLAY_BACKGROUND = '#FFF',

			STR_SIZE = 'size',

			STR_SPACE = ' ',

			STR_THUMBNAIL_EXTENSION = '.png',

			STR_THUMBNAIL_DEFAULT = 'default' + STR_THUMBNAIL_EXTENSION,

			STR_THUMBNAIL_PDF = 'pdf' + STR_THUMBNAIL_EXTENSION,

			STR_THUMBNAIL_AUDIO = 'music' + STR_THUMBNAIL_EXTENSION,

			STR_THUMBNAIL_COMPRESSED = 'compressed' + STR_THUMBNAIL_EXTENSION,

			STR_THUMBNAIL_VIDEO = 'video' + STR_THUMBNAIL_EXTENSION,

			STR_THUMBNAIL_PATH = PATH_THEME_IMAGES + '/file_system/large/',

			TPL_ENTRY_ROW_TITLE = '<span class="' + CSS_APP_VIEW_ENTRY + STR_SPACE + CSS_ENTRY_DISPLAY_STYLE + '">' +
			'<a class="' + CSS_TAGLIB_ICON + '">' +
				'<img alt="" class="' + CSS_ICON + '" src="' + PATH_THEME_IMAGES + '/file_system/small/page.png" />' +
				'<span class="' + CSS_TAGLIB_TEXT + '">{0}</span>' +
			'</a>' +
		'</span>',

			TPL_ERROR_FOLDER = new A.Template(
			'<span class="lfr-status-success-label">{validFilesLength}</span>',
			'<span class="lfr-status-error-label">{invalidFilesLength}</span>',
			'<ul class="list-unstyled">',
				'<tpl for="invalidFiles">',
					'<li><b>{name}</b>: {errorMessage}</li>',
				'</tpl>',
			'</ul>'
		),

			TPL_IMAGE_THUMBNAIL = themeDisplay.getPathContext() + '/documents/' + themeDisplay.getScopeGroupId() + '/{0}/{1}';

		var UploadUIBase = function() {};

		UploadUIBase.prototype =
			{
				initTemplates: function() {
					var instance = this,
						appViewEntryTemplates = instance.get('appViewEntryTemplates');

					instance._invisibleDescriptiveEntry = appViewEntryTemplates.one(SELECTOR_ENTRY_DISPLAY_STYLE + SELECTOR_DISPLAY_DESCRIPTIVE);
					instance._invisibleIconEntry = appViewEntryTemplates.one(SELECTOR_ENTRY_DISPLAY_STYLE + SELECTOR_DISPLAY_ICON);
				},

				_createEntryNode: function(name, size, displayStyle) {
					var instance = this;

					var entryNode;

					var entriesContainer = instance.get('entriesContainer');

					if (displayStyle == STR_LIST) {
						var searchContainer = entriesContainer.one(SELECTOR_SEARCH_CONTAINER);

						entriesContainer = searchContainer.one('tbody');

						entryNode = instance._createEntryRow(name, size);
					}
					else {
						var invisibleEntry = instance._invisibleDescriptiveEntry;

						if (displayStyle == CSS_ICON) {
							invisibleEntry = instance._invisibleIconEntry;
						}

						entryNode = invisibleEntry.clone();

						var entryLink = entryNode.one(SELECTOR_ENTRY_LINK);

						var entryTitle = entryLink.one(SELECTOR_ENTRY_TITLE_TEXT);

						entryLink.attr('title', name);

						entryTitle.setContent(name);
					}

					entryNode.attr(
						{
							'data-title': name,
							id: A.guid()
						}
					);

					entriesContainer.append(entryNode);

					entryNode.show().scrollIntoView();

					return entryNode;
				},

				_createEntryRow: function(name, size) {
					var instance = this;

					var searchContainerNode = instance._entriesContainer.one(SELECTOR_SEARCH_CONTAINER);

					var searchContainer = Liferay.SearchContainer.get(searchContainerNode.attr('id'));

					var columnValues = A.Array.map(
						instance._columnNames,
						function(item, index) {
							var value = STR_BLANK;

							if (item == STR_NAME) {
								value = sub(TPL_ENTRY_ROW_TITLE, [name]);
							}
							else if (item == STR_SIZE) {
								value = instance.formatStorage(size);
							}
							else if (item == 'downloads') {
								value = '0';
							}

							return value;
						}
					);

					var row = searchContainer.addRow(columnValues, A.guid());

					row.attr('data-draggable', true);

					return row;
				},

				_createOverlay: function(target, background) {
					var instance = this;

					var overlay = new A.OverlayMask(
						{
							background: background || null,
							target: target
						}
					).render();

					overlay.get(STR_BOUNDING_BOX).addClass('portlet-document-library-upload-mask');

					return overlay;
				},

				_createProgressBar: function() {
					var instance = this;

					var dimensions = instance.get('dimensions');

					var height = dimensions.height / 5;

					var width = dimensions.width / 0.64;

					return new A.ProgressBar(
						{
							height: height,
							on: {
								complete: function(event) {
									this.set(STR_LABEL, 'complete!');
								},
								valueChange: function(event) {
									this.set(STR_LABEL, event.newVal + '%');
								}
							},
							width: width
						}
					);
				},

				_createUploadStatus: function(target, file) {
					var instance = this;

					var overlay = instance._createOverlay(target);
					var progressBar = instance._createProgressBar();

					overlay.show();

					if (file) {
						file.overlay = overlay;
						file.progressBar = progressBar;
						file.target = target;
					}
					else {
						target.overlay = overlay;
						target.progressBar = progressBar;
					}
				},

				_destroyEntry: function() {
					var instance = this;

					var currentUploadData = instance._getCurrentUploadData();

					var fileList = currentUploadData.fileList;

					if (!currentUploadData.folder) {
						A.Array.each(
							fileList,
							function(item, index) {
								item.overlay.destroy();

								item.progressBar.destroy();
							}
						);
					}

					A.Array.invoke(fileList, 'destroy');
				},

				_displayEntryError: function(node, message, displayStyle) {
					var instance = this;

					if (displayStyle == STR_LIST) {
						var imageIcon = node.one(SELECTOR_IMAGE_ICON);

						imageIcon.attr('src', PATH_THEME_IMAGES + '/common/close.png');
					}
					else {
						node.addClass(CSS_UPLOAD_ERROR);
					}

					instance._displayError(node, message);
				},

				_displayError: function(node, message) {
					var instance = this;

					node.attr('data-message', message);

					var tooltipDelegate = instance._tooltipDelegate;

					if (!tooltipDelegate) {
						tooltipDelegate = new A.TooltipDelegate(
							{
								formatter: function() {
									var tooltip = this;

									tooltip.set('zIndex', 2);

									var node = tooltip.get('trigger');

									return node.attr('data-message');
								},
								trigger: '.app-view-entry.upload-error',
								visible: false
							}
						);

						instance._tooltipDelegate = tooltipDelegate;
					}

					return node;
				},

				_displayResult: function(node, displayStyle, error) {
					var resultsNode = node;

					if (resultsNode) {
						var uploadResultClass = CSS_UPLOAD_SUCCESS;

						if (error) {
							resultsNode.removeClass(CSS_UPLOAD_ERROR).removeClass(CSS_UPLOAD_WARNING);

							if (error === true) {
								uploadResultClass = CSS_UPLOAD_ERROR;
							}
							else if (error == ERROR_RESULTS_MIXED) {
								uploadResultClass = CSS_UPLOAD_WARNING;
							}
						}

						resultsNode.addClass(uploadResultClass);
					}
				},

				_getDisplayStyle: function(style) {
					var instance = this;

					var displayStyleNamespace = instance.get(STR_HOST).ns('displayStyle');

					var displayStyle = Liferay.HistoryManager.get(displayStyleNamespace) || instance._displayStyle;

					if (style) {
						displayStyle = (style == displayStyle);
					}

					return displayStyle;
				},

				_getEmptyMessage: function() {
					var instance = this;

					var emptyMessage = instance._emptyMessage;

					if (!emptyMessage) {
						emptyMessage = instance.get('entriesContainer').one(SELECTOR_ENTRIES_EMPTY);

						instance._emptyMessage = emptyMessage;
					}

					return emptyMessage;
				},

				_getMediaThumbnail: function(fileName) {
					var instance = this;

					var thumbnailName = STR_THUMBNAIL_DEFAULT;

					if (REGEX_IMAGE.test(fileName)) {
						thumbnailName = sub(TPL_IMAGE_THUMBNAIL, [instance.get(STR_FOLDER_ID), fileName]);
					}
					else {
						if (Lang.String.endsWith(fileName.toLowerCase(), STR_EXTENSION_PDF)) {
							thumbnailName = STR_THUMBNAIL_PDF;
						}
						else if (REGEX_AUDIO.test(fileName)) {
							thumbnailName = STR_THUMBNAIL_AUDIO;
						}
						else if (REGEX_VIDEO.test(fileName)) {
							thumbnailName = STR_THUMBNAIL_VIDEO;
						}
						else if (REGEX_COMPRESSED.test(fileName)) {
							thumbnailName = STR_THUMBNAIL_COMPRESSED;
						}

						thumbnailName = STR_THUMBNAIL_PATH + thumbnailName;
					}

					return thumbnailName;
				},

				_getNavigationOverlays: function() {
					var instance = this;

					var navigationOverlays = instance._navigationOverlays;

					if (!navigationOverlays) {
						navigationOverlays = [];

						var createNavigationOverlay = function(target) {
							if (target) {
								var overlay = instance._createOverlay(target, STR_NAVIGATION_OVERLAY_BACKGROUND);

								navigationOverlays.push(overlay);
							}
						};

						var entriesContainer = instance.get('entriesContainer');

						createNavigationOverlay(entriesContainer.one(SELECTOR_DOCUMENT_ENTRIES_PAGINATION));
						createNavigationOverlay(entriesContainer.one('.app-view-taglib.lfr-header-row'));
						createNavigationOverlay(instance.get('listViewContainer'));

						instance._navigationOverlays = navigationOverlays;
					}

					return navigationOverlays;
				},

				_positionProgressBar: function(overlay, progressBar) {
					var instance = this;

					var progressBarBoundingBox = progressBar.get(STR_BOUNDING_BOX);

					progressBar.render(overlay.get(STR_BOUNDING_BOX));

					progressBarBoundingBox.center(overlay.get(STR_CONTENT_BOX));
				},

				_showFileUploadComplete: function(event, displayStyle) {
					var instance = this;

					var file = event.file;

					var fileNode = file.target;

					var response = instance._getUploadResponse(event.data);

					if (response) {
						var hasErrors = !!response.error;

						if (hasErrors) {
							instance._displayEntryError(fileNode, response.message, displayStyle);
						}
						else {
							var displayStyleList = (displayStyle == STR_LIST);

							if (!displayStyleList) {
								instance._updateThumbnail(fileNode, file.name);
							}

							instance._updateFileLink(fileNode, response.message, displayStyleList);
						}

						instance._displayResult(fileNode, displayStyle, hasErrors);
					}

					file.overlay.hide();
				},

				_showFileUploadProgress: function(event) {
					var instance = this;

					instance._updateProgress(event.file.progressBar, event.percentLoaded);
				},

				_showFileUploadStarting: function(event) {
					var instance = this;

					var file = event.file;

					instance._positionProgressBar(file.overlay, file.progressBar);
				},

				_showFolderUploadProgress: function(event, uploadData) {
					var instance = this;

					instance._updateProgress(uploadData.target.progressBar, event.percentLoaded);
				},

				_showFolderUploadStarting: function(event, uploadData) {
					var instance = this;

					var target = uploadData.target;

					instance._positionProgressBar(target.overlay, target.progressBar);
				},

				_showFolderUploadComplete: function(event, uploadData, displayStyle) {
					var instance = this;

					var folderEntry = uploadData.target;
					var invalidFiles = uploadData.invalidFiles;
					var totalFilesLength = uploadData.fileList.length;

					var invalidFilesLength = invalidFiles.length;

					var hasErrors = (invalidFilesLength !== 0);

					if (hasErrors && (invalidFilesLength !== totalFilesLength)) {
						hasErrors = ERROR_RESULTS_MIXED;
					}

					instance._displayResult(folderEntry, displayStyle, hasErrors);

					if (hasErrors) {
						instance._displayError(
							folderEntry,
							TPL_ERROR_FOLDER.parse(
								{
									invalidFiles: invalidFiles,
									invalidFilesLength: invalidFilesLength,
									validFilesLength: totalFilesLength - invalidFilesLength
								}
							)
						);
					}

					folderEntry.overlay.hide();
				},

				_updateProgress: function(progressBar, value) {
						var instance = this;

						progressBar.set('value', Math.ceil(value));
				},

				_updateStatusUI: function(folderId, folderEntryNode, filesPartition) {
					var instance = this;

					var folder = (folderId !== instance.get(STR_FOLDER_ID));

					if (folder) {
						var folderEntryNodeOverlay = folderEntryNode.overlay;

						if (folderEntryNodeOverlay) {
							folderEntryNodeOverlay.show();

							instance._updateProgress(folderEntryNode.progressBar, 0);
						}
						else {
							instance._createUploadStatus(folderEntryNode);
						}

						folderEntryNode.removeClass(CSS_ACTIVE_AREA);
					}
					else {
						var displayStyle = instance._getDisplayStyle();

						A.Array.map(
							filesPartition.matches,
							function(file) {
								var entryNode = instance._createEntryNode(file.name, file.size, displayStyle);

								instance._createUploadStatus(entryNode, file);
							}
						);

						A.Array.map(
							filesPartition.rejects,
							function(file) {
								var entryNode = instance._createEntryNode(file.name, file.size, displayStyle);

								instance._displayEntryError(entryNode, file.errorMessage, instance._getDisplayStyle());
							}
						);
					}
				},

				_updateThumbnail: function(node, fileName) {
					var instance = this;

					var imageNode = node.one('img');

					var thumbnailPath = instance._getMediaThumbnail(fileName);

					imageNode.attr('src', thumbnailPath);
				}
			};

			A.Base.mix(Liferay.UploadBase, [UploadUIBase]);
	},
	'',
	{
		requires: ['liferay-upload-base', 'aui-template-deprecated']
	}
);