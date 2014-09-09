AUI.add(
	'document-library-upload-base',
	function(A) {
		var Lang = A.Lang,

		STR_BLANK = '';

		var  DocumentLibraryUploadBase = A.Component.create(
			{

				NAME: 'documentlibraryuploadbase',

				EXTENDS: Liferay.UploadBase,

				ATTRS: {
					folderId: {
						setter: Lang.toInt,
						readonly: true,
						validator: Lang.isNumber || Lang.isString,
						value: 0
					},

					redirect: {
						validator: Lang.isString,
						value: STR_BLANK
					}
				},

				prototype: {
					_combineFileLists: function(fileList, queuedFiles) {
						A.Array.each(
							queuedFiles,
							function(item, index) {
								fileList.push(item);
							}
						);
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

					_getDataSet: function() {
						var instance = this;

						var dataSet = instance._dataSet;

						if (!dataSet) {
							dataSet = new A.DataSet();

							instance._dataSet = dataSet;
						}

						return dataSet;
					},

					_getCurrentUploadData: function() {
						var instance = this;

						var dataSet = instance._getDataSet();

						return dataSet.get('first');
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
								message = Liferay.Util.ns(instance.get('namespace'), 'fileEntryId=') + responseData.fileEntryId;
							}
						}

						return {
							error: error,
							message: message
						};
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

						return Lang.sub(
							uploadURL,
							{
								folderId: folderId
							}
						);
					},

					_afterAllUploadsComplete: function(event) {
						var instance = this;

						instance.set('enabled', true);

						instance.set('fileList', []);

						Liferay.fire('allUploadsComplete');

						instance._startNextUpload();
					},

					_onFileSelect: function(event) {
						var instance = this;

						var fileList = event.fileList;

						var target = event.details[0].target;

						var filesPartition = instance._dataValidation.getValidFiles(fileList);

						instance._currentFilesPartition = filesPartition;

						event.filesPartition = filesPartition;

						instance._queueSelectedFiles(target, filesPartition);
					},

					_queueSelectedFiles: function(target, filesPartition) {
						var instance = this;

						var key = instance._UI._getTargetFolderId(target, instance.get('folderId'));

						var keyData = instance._getUploadStatus(key);

						var validFiles = filesPartition.matches;

						if (keyData) {
							instance._updateDataSetEntry(key, keyData, validFiles);
						}
						else {
							var dataSet = instance._getDataSet();

							var folderNode = null;

							var folder = (key !== instance.get('folderId'));

							if (folder) {
								folderNode = instance._UI._getFolderEntryNode(target);
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

					_startNextUpload: function() {
						var instance = this;

						instance._UI._detachSubscriptions();

						instance._UI._destroyEntry();

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

						if (fileList.length) {
							var uploadURL = instance._getUploadURL(uploadData.folderId);

							instance._UI._attachSubscriptions(uploadData);

							instance.uploadThese(fileList, uploadURL);
						}
						else {
							instance.fire('alluploadscomplete');
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
					}
				}
			}
		);

		Liferay.DocumentLibraryUploadBase = DocumentLibraryUploadBase;
	},
	'',
	{
		requires: ['liferay-upload-base', 'aui-component', 'aui-data-set-deprecated']
	}
);