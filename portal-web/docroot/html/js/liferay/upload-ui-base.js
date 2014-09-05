AUI.add(
	'liferay-upload-ui-base',
	function(A) {
		var Lang = A.Lang,
			AArray = A.Array,

			formatSelectorNS = A.Node.formatSelectorNS,

			STATUS_CODE = Liferay.STATUS_CODE,

			STR_BLANK = '',

			STRINGS = 'strings',

			TPL_ERROR_MESSAGE = '<div class="alert alert-danger">{0}</div>',

			HTML5FILEFIELD_TEMPLATE = '<input type="file" style="visibility:hidden; width:0px; height: 0px;">',

			UPLOADER_TYPE = A.Uploader.TYPE || 'none',

			TPL_FILE_LIST = [
				'<tpl for=".">',
					'<tpl if="!values.error">',
						'<li class="upload-file {[ values.temp ? "upload-complete pending-file selectable" : "" ]} {[ values.selected ? "selected" : "" ]}" data-fileId="{id}" data-fileName="{[ LString.escapeHTML(values.name) ]}" data-title="{[ LString.escapeHTML(values.title ? values.title : values.name) ]}" id="{id}">',
							'<input class="{[ !values.temp ? "hide" : "" ]} select-file" data-fileName="{[ LString.escapeHTML(values.name) ]}" data-title="{[ LString.escapeHTML(values.title ? values.title : values.name) ]}" id="{id}checkbox" name="{$ns}selectUploadedFile" type="{[ this.multipleFiles ? "checkbox" : "hidden" ]}" value="{[ LString.escapeHTML(values.name) ]}" />',
							'<span class="file-title" title="{[ LString.escapeHTML(values.title ? values.title : values.name) ]}">{[ LString.escapeHTML(values.title ? values.title : values.name) ]}</span>',
							'<span class="progress-bar">',
								'<span class="progress" id="{id}progress"></span>',
							'</span>',
							'<a class="lfr-button cancel-button" href="javascript:;" id="{id}cancelButton">{[ this.strings.cancelFileText ]}</a>',
							'<a class="lfr-button delete-button" href="javascript:;" id="{id}deleteButton">{[ this.strings.deleteFileText ]}</a>',
						'</li>',
					'</tpl>',
					'<tpl if="values.error && this.multipleFiles">',
						'<li class="upload-file upload-error" data-fileId="{id}" id="{id}">',
							'<span class="file-title" title="{[ LString.escapeHTML(values.name) ]}">{[ LString.escapeHTML(values.name) ]}</span>',
							'<span class="error-message" title="{[ LString.escapeHTML(values.error) ]}">{[ LString.escapeHTML(values.error) ]}</span>',
							'<tpl if="values.messageListItems && (values.messageListItems.length > 0)">',
								'<ul class="error-list-items">',
									'<tpl for="messageListItems">',
										'<li>{[ LString.escapeHTML(values.type) ]}: <strong>{[ LString.escapeHTML(values.name) ]}</strong>',
											'<tpl if="info">',
												'<span class="error-info"">({[ LString.escapeHTML(values.info) ]})</span>',
											'</tpl>',
										'</li>',
									'</tpl>',
								'</ul>',
							'</tpl>',
						'</li>',
					'</tpl>',
					'<tpl if="values.error && !this.multipleFiles">',
						'<li class="alert alert-danger upload-error" data-fileId="{id}" id="{id}">',
							'<h4 class="upload-error-message">{[ Lang.sub(this.strings.fileCannotBeSavedText, [LString.escapeHTML(values.name)]) ]}</h4>',
							'<span class="error-message" title="{[ LString.escapeHTML(values.error) ]}">{[ LString.escapeHTML(values.error) ]}</span>',
							'<tpl if="values.messageListItems && (values.messageListItems.length > 0)">',
								'<ul class="error-list-items">',
									'<tpl for="messageListItems">',
										'<li>{[ LString.escapeHTML(values.type) ]}: <strong>{[ LString.escapeHTML(values.name) ]}</strong>',
											'<tpl if="info">',
												'<span class="error-info"">({[ LString.escapeHTML(values.info) ]})</span>',
											'</tpl>',
										'</li>',
									'</tpl>',
								'</ul>',
							'</tpl>',
						'</li>',
					'</tpl>',
					'<tpl if="values.warningMessages && (values.warningMessages.length > 0)">',
						'<li class="alert upload-error" data-fileId="{id}" id="{id}">',
							'<span class="error-message" title="{[ LString.escapeHTML(values.error) ]}">{[ values.error ? this.strings.warningFailureText : this.strings.warningText ]}</span>',
							'<ul class="error-list-items">',
								'<tpl for="warningMessages">',
									'<li>{[ LString.escapeHTML(values.type) ]} <strong>({size})</strong>:',
										'<tpl if="info">',
											'<span class="error-info"">{[ LString.escapeHTML(values.info) ]}</span>',
										'</tpl>',
									'</li>',
								'</tpl>',
							'</ul>',
						'</li>',
					'</tpl>',
				'</tpl>'
			],

			TPL_UPLOAD = [
				'<div class="upload-target" id="{$ns}uploader">',
					'<div class="drag-drop-area" id="{$ns}uploaderContent">',
						'<tpl if="this.uploaderType == \'html5\'">',
							'<h4 class="drop-file-text">{[ this.dropFileText ]}<span class="or-text">{[ this.strings.orText ]}</span></h4>',
						'</tpl>',
						'<span class="select-files-container" id="{$ns}selectFilesButton">',
							'<button class="btn btn-default" type="button">{[ this.selectFilesText ]}</button>',
						'</span>',
					'</div>',
				'</div>',

				'<div class="hide upload-list-info" id="{$ns}listInfo">',
					'<h4>{[ this.strings.uploadsCompleteText ]}</h4>',
				'</div>',

				'<div class="pending-files-info alert alert-warning hide">{[ this.strings.pendingFileText ]}</div>',

				'<div class="hide float-container manage-upload-target" id="{$ns}manageUploadTarget">',
					'<tpl if="multipleFiles">',
						'<span class="field field-choice select-files">',
							'<span class="field-content">',
								'<span class="field-element">',
									'<input class="select-all-files" id="{$ns}allRowIds" name="{$ns}allRowIds" type="checkbox" />',
								'</span>',
							'</span>',
						'</span>',
					'</tpl>',

					'<a href="javascript:;" class="lfr-button cancel-uploads hide">{[ this.cancelUploadsText ]}</a>',
					'<a href="javascript:;" class="lfr-button clear-uploads hide">{[ this.strings.clearRecentUploadsText ]}</a>',
				'</div>',

				'<div class="upload-list" id="{$ns}fileList">',
					'<ul class="list-unstyled {[ this.multipleFiles ? "multiple-files" : "single-file" ]}" id="{$ns}fileListContent"></ul>',
				'</div>'
			];

		var  UploadUIBase = A.Component.create(
			{
				NAME: 'uploaduibase',

				AUGMENTS: [Liferay.PortletBase],

				ATTRS: {
					metadataContainer: {
						setter: A.one,
						value: null
					},

					metadataExplanationContainer: {
						setter: A.one,
						value: null
					},

					strings: {
						value: {
							allFilesSelectedText: Liferay.Language.get('all-files-selected'),
							cancelFileText: Liferay.Language.get('cancel-upload'),
							cancelUploadsText: Liferay.Language.get('cancel-all-uploads'),
							clearRecentUploadsText: Liferay.Language.get('clear-documents-already-saved'),
							deleteFileText: Liferay.Language.get('delete-file'),
							dropFileText: Liferay.Language.get('drop-file-here-to-upload'),
							dropFilesText: Liferay.Language.get('drop-files-here-to-upload'),
							fileCannotBeSavedText: Liferay.Language.get('the-file-x-cannot-be-saved'),
							invalidFileNameText: Liferay.Language.get('please-enter-a-file-with-a-valid-file-name'),
							invalidFileSizeText: Liferay.Language.get('please-enter-a-file-with-a-valid-file-size-no-larger-than-x'),
							noFilesSelectedText: Liferay.Language.get('no-files-selected'),
							notAvailableText: Liferay.Language.get('multiple-file-uploading-is-not-available'),
							orText: Liferay.Language.get('or'),
							pendingFileText: Liferay.Language.get('these-files-have-been-previously-uploaded-but-not-actually-saved.-please-save-or-delete-them-before-they-are-removed'),
							selectFileText: Liferay.Language.get('select-file'),
							selectFilesText: Liferay.Language.get('select-files'),
							unexpectedErrorOnDeleteText: Liferay.Language.get('an-unexpected-error-occurred-while-deleting-the-file'),
							unexpectedErrorOnUploadText: Liferay.Language.get('an-unexpected-error-occurred-while-uploading-your-file'),
							uploadingFileXofXText: Liferay.Language.get('uploading-file-x-of-x'),
							uploadingText: Liferay.Language.get('uploading'),
							uploadsCompleteText: Liferay.Language.get('all-files-ready-to-be-saved'),
							warningFailureText: Liferay.Language.get('consider-that-the-following-data-would-not-have-been-imported-either'),
							warningText: Liferay.Language.get('the-following-data-will-not-be-imported'),
							xFilesReadyText: Liferay.Language.get('x-files-ready-to-be-uploaded'),
							xFilesSelectedText: Liferay.Language.get('x-files-selected'),
							zeroByteSizeText: Liferay.Language.get('the-file-contains-no-data-and-cannot-be-uploaded.-please-use-the-classic-uploader')
						}
					}
				},

				prototype: {
					renderUI: function() {
						var instance = this;

						instance._host = instance.get('host');

						instance._renderControls();

						var contentBox = instance._host.get('contentBox');

						instance._host._fileInputField = A.Node.create(HTML5FILEFIELD_TEMPLATE);

						contentBox.append(instance._fileInputField);
					},

					bindUI: function() {
						var instance = this;

						if (instance._allRowIdsCheckbox) {
							instance._allRowIdsCheckbox.on('click', instance._onAllRowIdsClick, instance);
						}

						instance._bindDragDropUI();

						instance._cancelButton.on('click', instance._cancelAllFiles, instance);
						instance._clearUploadsButton.on('click', instance._clearUploads, instance);

						instance._fileListNode.delegate('click', instance._handleFileClick, '.select-file, li .delete-button, li .cancel-button', instance);

						Liferay.after('filesSaved', instance._afterFilesSaved, instance);

						instance._host.after('alluploadscomplete', instance._onAllUploadsComplete, instance);
						instance._host.after('fileselect', instance._afterFileSelect, instance);
						instance._host.after('uploadcomplete', instance._afterUploadComplete, instance);

						instance._selectFilesButton.on('click', instance.openFileSelectDialog, instance);

						instance._bindFileInputField();

						instance._bindSelectFilesButton();
					},

					_bindDragDropUI: function() {
						var instance = this;

						var docElement = A.getDoc().get('documentElement');

						docElement.on('dragover', instance._handleDragOver, instance);
						docElement.on('drop', instance._handleDrop, instance);
					},

					_handleDragOver: function(event) {
						var instance = this;

						var docElement = A.getDoc().get('documentElement');

						var originalEvent = event._event;

						var dataTransfer = originalEvent.dataTransfer;

						var uploaderBoundingBox = instance._uploaderBoundingBox;

						if (dataTransfer && AArray.indexOf(dataTransfer.types, 'Files') > -1) {
							event.halt();

							docElement.addClass('upload-drop-intent');

							var target = event.target;

							var inDropArea = target.compareTo(uploaderBoundingBox) || uploaderBoundingBox.contains(target);

							var dropEffect = 'none';

							if (inDropArea) {
								dropEffect = 'copy';
							}

							docElement.toggleClass('upload-drop-active', inDropArea);

							dataTransfer.dropEffect = dropEffect;
						}

						instance._host.removeCssClassTask();
					},

					_afterFilesSaved: function(event) {
						var instance = this;

						instance._updateMetadataContainer();
						instance._updateManageUploadDisplay();
					},

					_afterFileSelect: function(event) {
						var instance = this;

						instance._cancelButton.show();

						instance._pendingFileInfo.hide();
					},

					_bindFileInputField: function() {
						var instance = this;

						var bindSelectButton = instance._host.constructor.superclass._bindSelectButton;

						bindSelectButton.apply(instance._host);
					},

					_bindSelectFilesButton: function() {
						var instance = this;

						instance._host._fileInputField.on('change', instance._host._updateFileList, instance._host);

						instance._host._fileInputField.on('click', function(event) {
							event.stopPropagation();
						}, instance._host);

						instance._host.get('selectFilesButton').set('tabIndex', instance._host.get('tabIndex'));
					},

					_cancelAllFiles: function() {
						var instance = this;

						var strings = instance.get(STRINGS);

						var queue = instance._host.queue;

						queue.pauseUpload();

						A.each(
							queue.queuedFiles,
							function(item, index) {
								var li = A.one('#' + item.id);

								if (li && !li.hasClass('upload-complete')) {
									li.remove(true);
								}
							}
						);

						A.all('.file-uploading').remove(true);

						instance._cancelButton.hide();

						instance._filesTotal = 0;

						var cancelText = (instance._host.get('multipleFiles')) ? strings.cancelUploadsText : strings.cancelFileText;

						instance._updateList(0, cancelText);

						instance._host.cancelAll();
					},

					_clearUploads: function() {
						var instance = this;

						instance._fileListContent.all('.file-saved,.upload-error').remove(true);

						instance._updateManageUploadDisplay();
					},

					_handleDrop: function(event) {
						var instance = this;

						event.halt();

						var dataTransfer = event._event.dataTransfer;

						var dragDropFiles = dataTransfer && A.Array(dataTransfer.files);

						if (dragDropFiles) {
							event.fileList = A.Array.map(
								dragDropFiles,
								function(item, index) {
									return new A.FileHTML5(item);
								}
							);

							instance._host.fire('fileselect', event);
						}
					},

					_formatTempFiles: function(fileNames) {
						var instance = this;

						if (fileNames.length && Lang.isArray(fileNames)) {
							var fileListContent = instance._fileListContent;

							instance._pendingFileInfo.show();
							instance._manageUploadTarget.show();

							var metadataExplanationContainer = instance._metadataExplanationContainer;

							if (metadataExplanationContainer) {
								metadataExplanationContainer.show();
							}

							var files = AArray.map(
								fileNames,
								function(item, index) {
									var title = item;

									var tempRandomSuffix = instance.get('tempRandomSuffix');

									if (tempRandomSuffix) {
										var pos = title.indexOf(tempRandomSuffix);

										if (pos != -1) {
											title = title.substr(0, pos);
										}
									}

									return {
										id: A.guid(),
										name: item,
										temp: true,
										title: title
									};
								}
							);

							instance._fileListTPL.render(files, fileListContent);
						}
						else if (instance._allRowIdsCheckbox) {
							instance._allRowIdsCheckbox.attr('checked', true);
						}
					},

					_handleDeleteResponse: function(json, fileName) {
						var instance = this;

						var li = instance._fileListContent.one('li[data-fileName="' + fileName + '"]');

						if (!json.deleted) {
							var errorHTML = instance._fileListTPL.parse(
								[
									{
										error: json.errorMessage,
										id: li.attr('data-fileId'),
										name: li.attr('data-fileName')
									}
								]
							);

							li.replace(errorHTML);
						}

						li.remove(true);

						instance._updateManageUploadDisplay();
						instance._updateMetadataContainer();
						instance._updatePendingInfoContainer();
						instance._updateWarningContainer();

						Liferay.fire('tempFileRemoved');
					},

					_handleFileClick: function(event) {
						var instance = this;

						var currentTarget = event.currentTarget;

						if (currentTarget.hasClass('select-file')) {
							instance._onSelectFileClick(currentTarget);
						}
						else if (currentTarget.hasClass('delete-button')) {
							instance._onDeleteFileClick(currentTarget);
						}
						else if (currentTarget.hasClass('cancel-button')) {
							instance._onCancelFileClick(currentTarget);
						}
					},

					_handleNotSupported: function() {
						var instance = this;

						var strings = instance.get('strings');

						instance.one('#fileUpload').append(Lang.sub(TPL_ERROR_MESSAGE, [strings.notAvailableText]));
					},

					_markSelected: function(node) {
						var instance = this;

						var fileItem = node.ancestor('.upload-file.selectable');

						fileItem.toggleClass('selected');
					},

					_onAllRowIdsClick: function(event) {
						var instance = this;

						Liferay.Util.checkAll(
							instance._fileListSelector,
							instance._selectUploadedFileCheckboxId,
							instance._allRowIdsCheckboxSelector
						);

						var uploadedFiles = instance._fileListContent.all('.upload-file.upload-complete');

						uploadedFiles.toggleClass('selected', instance._allRowIdsCheckbox.attr('checked'));

						instance._updateMetadataContainer();
					},

					_onAllUploadsComplete: function(event) {
						var instance = this;

						var strings = instance.get(STRINGS);

						instance._filesTotal = 0;

						instance._cancelButton.hide();

						if (instance._host.get('multipleFiles')) {
							instance._clearUploadsButton.toggle(!!instance._fileListContent.one('.file-saved,.upload-error'));
						}

						var uploadsCompleteText;

						if (instance._fileListContent.one('.upload-file.upload-complete') && instance._host.get('multipleFiles')) {
							uploadsCompleteText = strings.uploadsCompleteText;
						}

						instance._updateList(0, uploadsCompleteText);
					},

					_onCancelFileClick: function(currentTarget) {
						var instance = this;

						var strings = instance.get(STRINGS);

						var queue = instance._host.queue;

						var li = currentTarget.ancestor('li');

						if (li) {
							if (queue) {
								var fileId = li.attr('data-fileId');

								var file = queue.currentFiles[fileId] || AArray.find(
									queue.queuedFiles,
									function(item, index) {
										return item.id === fileId;
									}
								);

								if (file) {
									instance._updateList(0, strings.cancelFileText);

									instance.fire('cancelFile', {
										file: file
									});
								}

								if (queue.queuedFiles.length === 0 && queue.numberOfUploads <= 0) {
									instance._cancelButton.hide();
								}
							}

							li.remove(true);

							instance._filesTotal -= 1;
						}
					},

					_onDeleteFileClick: function(currentTarget) {
						var instance = this;

						var li = currentTarget.ancestor('li');

						li.hide();

						instance._host._deleteFile(li.attr('data-fileName'));
					},

					_onSelectFileClick: function(currentTarget) {
						var instance = this;

						if (instance._host.get('multipleFiles')) {
							Liferay.Util.checkAllBox(
								instance._fileListSelector,
								instance._selectUploadedFileCheckboxId,
								instance._allRowIdsCheckboxSelector
							);
						}

						instance._markSelected(currentTarget);

						instance._updateMetadataContainer();
					},

					_afterUploadComplete: function(event) {
						var instance = this;

						var strings = instance.get(STRINGS);

						var file = event.file;

						var fileId = file.id;

						var li = A.one('#' + fileId);

						var data = event.data;

						var input;

						var newLiNode;

						try {
							data = A.JSON.parse(data);
						}
						catch (err) {
						}

						if (data.status && (data.status >= STATUS_CODE.SC_DUPLICATE_FILE_EXCEPTION && data.status < STATUS_CODE.INTERNAL_SERVER_ERROR)) {
							file.error = data.message || strings.unexpectedErrorOnUploadText;

							file.messageListItems = data.messageListItems;
							file.warningMessages = data.warningMessages;

							newLiNode = instance._fileListTPL.parse([file]);

							if (li) {
								li.placeBefore(newLiNode);

								li.remove(true);
							}
							else {
								instance._fileListContent.prepend(newLiNode);
							}
						}
						else {
							if (li) {
								if (data.warningMessages) {
									file.selected = true;
									file.temp = true;
									file.warningMessages = data.warningMessages;

									newLiNode = instance._fileListTPL.parse([file]);

									li.placeBefore(newLiNode);

									li.remove(true);
								}
								else if (data.name) {
									file.selected = true;
									file.temp = true;
									file.name = data.name;
									file.title = data.title;

									newLiNode = A.Node.create(instance._fileListTPL.parse([file]));

									input = newLiNode.one('input');

									if (input) {
										input.attr('checked', true);

										input.show();
									}

									li.placeBefore(newLiNode);

									li.remove(true);
								}
								else {
									li.replaceClass('file-uploading', 'pending-file upload-complete selectable selected');

									input = li.one('input');

									if (input) {
										input.attr('checked', true);

										input.show();
									}
								}

								instance._updateManageUploadDisplay();
							}

							instance._updateMetadataContainer();
						}
					},

					_onUploadProgress: function(event) {
						var instance = this;

						var progress = A.byIdNS(event.file.id, 'progress');

						if (progress) {
							var percentLoaded = Math.min(Math.ceil(event.percentLoaded / 3) * 3, 100);

							progress.setStyle('width', percentLoaded + '%');
						}
					},

					_onFileUploadStart: function(event) {
						var instance = this;

						var strings = instance.get(STRINGS);

						var queue = instance.queue;

						var filesQueued = queue ? queue.queuedFiles.length : 0;

						var filesTotal = instance._filesTotal;

						var position = filesTotal - filesQueued;

						var currentListText;

						if (instance._host.get('multipleFiles')) {
							currentListText = Lang.sub(strings.uploadingFileXofXText, [position, filesTotal]);
						}
						else {
							currentListText = strings.uploadingText;

							instance._fileListContent.all('.pending-file,.upload-error').remove(true);
						}

						var fileIdSelector = '#' + event.file.id;

						A.on(
							'available',
							function() {
								A.one(fileIdSelector).addClass('file-uploading');
							},
							fileIdSelector
						);

						instance._listInfo.show();

						instance._updateList(0, currentListText);
					},

					_renderControls: function() {
						var instance = this;

						var strings = instance.get(STRINGS);

						var NS = instance._host.get('namespace');

						var templateConfig = {
							$ns: NS,
							cancelUploadsText: (instance._host.get('multipleFiles')) ? strings.cancelUploadsText : strings.cancelFileText,
							dropFileText: (instance._host.get('multipleFiles')) ? strings.dropFilesText : strings.dropFileText,
							multipleFiles: instance._host.get('multipleFiles'),
							selectFilesText: (instance._host.get('multipleFiles')) ? strings.selectFilesText : strings.selectFileText,
							strings: strings,
							uploaderType: UPLOADER_TYPE
						};

						instance._fileListTPL = new A.Template(TPL_FILE_LIST, templateConfig);

						instance._selectUploadedFileCheckboxId = Liferay.Util.ns(NS, 'selectUploadedFile');

						instance._fileListSelector = formatSelectorNS(NS, '#fileList');
						instance._allRowIdsCheckboxSelector = formatSelectorNS(NS, '#allRowIds');

						var uploadFragment = new A.Template(TPL_UPLOAD, templateConfig).render(
							{
								multipleFiles: instance._host.get('multipleFiles')
							}
						);

						instance._allRowIdsCheckbox = uploadFragment.one(instance._allRowIdsCheckboxSelector);

						instance._manageUploadTarget = uploadFragment.oneNS(NS, '#manageUploadTarget');

						instance._cancelButton = uploadFragment.one('.cancel-uploads');
						instance._clearUploadsButton = uploadFragment.one('.clear-uploads');

						instance._fileListNode = uploadFragment.one(instance._fileListSelector);
						instance._fileListContent = uploadFragment.oneNS(NS, '#fileListContent');
						instance._listInfo = uploadFragment.oneNS(NS, '#listInfo');
						instance._pendingFileInfo = uploadFragment.one('.pending-files-info');
						instance._selectFilesButton = uploadFragment.oneNS(NS, '#selectFilesButton button');

						instance._uploaderBoundingBox = uploadFragment.oneNS(NS, '#uploader');
						instance._uploaderContentBox = uploadFragment.oneNS(NS, '#uploaderContent');

						instance._metadataContainer = instance.get('metadataContainer');
						instance._metadataExplanationContainer = instance.get('metadataExplanationContainer');

						var tempFileURL = instance._host.get('tempFileURL');

						if (tempFileURL) {
							if (Lang.isString(tempFileURL)) {
								A.io.request(
									tempFileURL,
									{
										after: {
											success: function(event) {
												instance._formatTempFiles(this.get('responseData'));
											}
										},
										dataType: 'JSON'
									}
								);
							}
							else {
								tempFileURL.method(tempFileURL.params, A.bind('_formatTempFiles', instance));
							}
						}

						instance._uploadFragment = uploadFragment;

						instance._cancelButton.hide();

						instance._host.set('selectFilesButton', instance._selectFilesButton);
					},

					_renderFileList: function() {
						var instance = this;

						var fileListBuffer = instance._host._fileListBuffer;
						var fileListContent = instance._fileListContent;

						var fileListHTML = instance._fileListTPL.parse(fileListBuffer);

						var firstLi = fileListContent.one('li.upload-complete');

						if (firstLi) {
							firstLi.placeBefore(fileListHTML);
						}
						else {
							fileListContent.append(fileListHTML);
						}

						fileListBuffer.length = 0;
					},

					_updateList: function(listLength, message) {
						var instance = this;

						var strings = instance.get(STRINGS);

						var infoTitle = instance._listInfo.one('h4');

						if (!instance._host.get('multipleFiles')) {
							infoTitle.html('');
						}
						else if (infoTitle) {
							var listText = message || Lang.sub(strings.xFilesReadyText, [listLength]);

							infoTitle.html(listText);
						}
					},
					_updateManageUploadDisplay: function() {
						var instance = this;

						var fileListContent = instance._fileListContent;

						var hasUploadedFiles = !!fileListContent.one('.upload-complete');
						var hasSavedFiles = !!fileListContent.one('.file-saved,.upload-error');

						if (instance._allRowIdsCheckbox) {
							instance._allRowIdsCheckbox.toggle(hasUploadedFiles);
						}

						if (instance._host.get('multipleFiles')) {
							instance._clearUploadsButton.toggle(hasSavedFiles);
						}

						instance._manageUploadTarget.toggle(hasUploadedFiles);

						instance._listInfo.toggle(!!fileListContent.one('li'));
					},

					_updateMetadataContainer: function() {
						var instance = this;

						var strings = instance.get(STRINGS);

						var metadataContainer = instance._metadataContainer;
						var metadataExplanationContainer = instance._metadataExplanationContainer;

						if (metadataContainer && metadataExplanationContainer) {
							var totalFiles = instance._fileListNode.all('li input[name=' + instance._selectUploadedFileCheckboxId + ']');

							var totalFilesCount = totalFiles.size();

							var selectedFiles = totalFiles.filter(':checked');

							var selectedFilesCount = selectedFiles.size();

							var selectedFileName = STR_BLANK;

							var hasSelectedFiles = (selectedFilesCount > 0);

							if (hasSelectedFiles) {
								selectedFileName = selectedFiles.item(0).ancestor().attr('data-title');
							}

							if (metadataContainer) {
								metadataContainer.toggle(hasSelectedFiles);

								var selectedFilesText = strings.noFilesSelectedText;

								if (hasSelectedFiles) {
									if (selectedFilesCount == 1) {
										selectedFilesText = selectedFileName;
									}
									else if (selectedFilesCount == totalFilesCount) {
										selectedFilesText = strings.allFilesSelectedText;
									}
									else if (selectedFilesCount > 1) {
										selectedFilesText = Lang.sub(strings.xFilesSelectedText, [selectedFilesCount]);
									}
								}

								var selectedFilesCountContainer = metadataContainer.one('.selected-files-count');

								if (selectedFilesCountContainer) {
									selectedFilesCountContainer.html(selectedFilesText);

									selectedFilesCountContainer.attr('title', selectedFilesText);
								}
							}

							if (metadataExplanationContainer) {
								metadataExplanationContainer.toggle((!hasSelectedFiles) && (totalFilesCount > 0));
							}
						}
					},

					_updatePendingInfoContainer: function() {
						var instance = this;

						var totalFiles = instance._fileListNode.all('li input[name=' + instance._selectUploadedFileCheckboxId + ']');

						if (!totalFiles.size()) {
							instance._pendingFileInfo.hide();
						}
					},

					_updateWarningContainer: function() {
						var instance = this;

						var totalFiles = instance._fileListNode.all('li input[name=' + instance._selectUploadedFileCheckboxId + ']');

						if (!totalFiles.size()) {
							var warningContainer = instance._fileListNode.one('.upload-error');

							if (warningContainer) {
								warningContainer.hide();
							}
						}
					},

					_filesTotal: 0
				}
			}
		);

		Liferay.UploadUIBase = UploadUIBase;
	},
	'',
	{
		requires: ['liferay-upload-base', 'aui-template-deprecated', 'liferay-portlet-base']
	}
);