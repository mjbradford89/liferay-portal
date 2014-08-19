AUI.add(
	'liferay-upload-folders',
	function(A) {

		// Determine if we have access to the file system, without
		// sniffing the UA for webkit

		// to-do: load this module conditionally in modules.js
		if (!window.requestFileSystem || !window.webkitRequestFileSystem) {
			return;
		}

		// yay, we have access to the file system!

		var UploadFolders = function() {};

		UploadFolders.prototype = {
			initializer: function() {
				var instance = this;

				// `dataselect` should replace or envelope 'fileselect'
				// when selecting either files or folders

				instance.publish(
					'dataselect', {
						defaultFn: instance._onDataSelect
					}
				);
			},

			bindUI: function() {
				var instance = this;

				instance._bindDropUI();
			},

			_bindDropUI: function(event) {
				var instance = this;

				instance.on('drop', instance._onDrop, instance);
			},

			_onDataSelect: function(event) {
				var instance = this;

				var dataList = event.dataList;

				if (dataList) {
					// to-do: figure out how to attach folderId to the event payloa
					var folderId = event.folderId || instance.getFolderId();

					var url = instance._getUploadURL(folderId);

					if (instance.validateData) {
						instance.validateData(dataList);
					}

					if (instance.get('useQueue')) {
						// to-do: making queueing optional

						instance.queueData(dataList, url);
					}
					else {
						// upload the data.
						// a loss in data may occur if other data was in progress
						instance.uploadData(dataList, url);
					}
				}

				// to-do: define a queueing system for files and folders

				// to-do: allow syncUI to update the upload status UI
				instance.syncUI();
			},

			// replace the `_onDrop` from `Liferay.UploadBase`
			_onDrop: function(event) {
				var instance = this;

				event.preventDefault();

				var orginalEvent = event._event;

				var dataTransfer = orginalEvent.dataTransfer;

				var dataTransferTypes = dataTransfer.types || [];

				if ((A.Array.indexOf(dataTransferTypes, 'Files') > -1) && (A.Array.indexOf(dataTransferTypes, 'text/html') === -1)) {
					event.halt(); // do i need this if we just prevented default?

					var items = dataTransfer.items;

					if (items) {
						event.itemList = A.Array.map(
							A.Array(items),
							function(item) {
								var entryItem = item.webkitGetAsEntry();

								if (entryItem.isDirectory) {
									event.folderData = A.rbind(instance.uploadFolder, instance, entryItem);
								}
								else if (entryItem.isFile) {
									var file = item.getAsFile();

									return new A.FileHTML5(file);
								}
							}
						);

						instance.fire('dataselect', event);
					}
				}
			},

			uploadFolderFlat: function(data, folderId) {
				var instance = this;

				var fileList = [];

				var recur = function(treeNode) {
					if (treeNode.isFile) {
						treeNode.file(
							function(file) {
								fileList.push(new A.FileHTML5(file));
							}
						);
					}
					else if (treeNode.isDirectory) {
						var directoryReader = treeNode.createReader();

						directoryReader.readEntries(
							function(entries) {
								A.Array.each(entries, recur);
							}
						);
					}
				};

				recur(data);

				// instance.uploadThese(fileList, instance._getUploadURL(folderId));
				instance.queueFiles(fileList, instance._getUploadURL(folderId));
			},

			uploadFolders: function(folderList, folderId) {
				var instance = this;

				var promises = A.Array.map(
					function(item) {
						return instance.uploadFolder(item, folderId);
					}
				);

				A.Promise.all(promises).then(function() {
					// all folders uploaded!
				});
			},

			uploadFolder: function(treeNode, folderId) {
				var instance = this;

				// I have an impementation of uploading folders that works: http://git.io/iWgH8A

				// The caveat is, it only resolves a Promise if an upload completes.
				// We'll need to come up with a solution that will either resolve the promise on `uploadcomplete`
				// or reject the promise on `uploaderror`

				// I took a stab at this below, but the pattern seems all wrong. And I'm not even sure if it will work.

				return new A.Promise(function(resolve, reject) {
					if (treeNode.isFile) {
						treeNode.file(
							function(file) {
								var fileHTML5 = new A.FileHTML5(file);

								var uploadURL = instance._getUploadURL(folderId);

								instance.upload(fileHTML5, uploadURL);

								var uploadcomplete, uploaderror;

								uploadcomplete = instance.once(
									'uploadcomplete',
									function() {
										if (uploaderror) {
											uploaderror.detach();
											// this works, but it's hacky as hell.
										}
										else {
											// this approach was completely wrong.
										}

										resolve(treeNode);
									}
								);

								uploaderror = instance.once(
									'uploaderror',
									function() {
										if (uploadcomplete) {
											uploadcomplete.detach();
											// this works, but it's hacky as hell.
										}
										else {
											// this approach was completely wrong.
										}

										reject(treeNode);
									}
								);
							}
						);
					}
					else if (treeNode.isDirectory) {
						var addFolder = instance.get('addFolder');

						addFolder.method(
							addFolder.params,
							function(response) {
								var directoryReader = treeNode.createReader();

								directoryReader.readEntries(
									function(entries) {
										var promises = A.Array.map(
											entries,
											function(item) {
												return instance.uploadFolder(item, response.folderId);
											}
										);

										A.Promise.all(promises).then(resolve);
									}
								);
							}
						);
					}
				});
			}
		};

		A.Base.mix(Liferay.UploadBase, [UploadFolders]);
	},
	'',
	{
		requires: ['file-html5', 'liferay-upload-base', 'promise']
	}
);