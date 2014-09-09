AUI.add(
	'liferay-upload-data-queue',
	function(A) {
		var Lang = A.Lang;

		var UploadDataQueue = A.Component.create(
			{
				NAME: 'uploaddataqueue',

				ATTRS: {
					queues: {
						validator: Lang.isArray,
						value: []
					}
				},

				EXTENDS: Liferay.UploadBase,

				prototype: {
					bindFileSelectEvent: function() {
						this.on('fileselect', this._handleFileSelectQueue);
					},

					bindQueueEvents: function(queue) {
						queue.on("uploadstart", this._uploadEventHandler, this);
						queue.on("uploadprogress", this._uploadEventHandler, this);
						queue.on("totaluploadprogress", this._uploadEventHandler, this);
						queue.on("uploadcomplete", this._uploadEventHandler, this);
						queue.on("alluploadscomplete", this._uploadEventHandler, this);
						queue.on("uploadcancel", this._uploadEventHandler, this);
						queue.on("uploaderror", this._uploadEventHandler, this);
					},

					createQueue: function(folderId, fileList, postVars) {
						var postVars = postvars || this.get("postVarsPerFile"),
							uploadURL = this._getUploadURL(folderId);

			            var newQueue = new UploaderQueue({
			                simUploads: this.get("simLimit"),
			                errorAction: this.get("errorAction"),
			                fileFieldName: this.get("fileFieldName"),
			                fileList: fileList,
			                uploadURL: uploadURL,
			                perFileParameters: postVars,
			                retryCount: this.get("retryCount"),
			                uploadHeaders: this.get("uploadHeaders"),
			                withCredentials: this.get("withCredentials")
			            });

			            this.bindQueueEvents(newQueue);

						newQueue.startUpload();

						this.fire("uploadstart");

						this.queues.push(newQueue);
					},

					getQueue: function(key, fileList, postVars) {
						var queues = this.get('queues'),
							toReturn = null;

						if (this.queue.get('uploadURL') === key) {
							return this.queue;
						}

						A.Array.each(queues,
							function(item, index) {
								if (item.get('uploadURL') === key){
									toReturn = item;
								}
							}
						);

						if (!toReturn) {
							toReturn = this.createQueue(key, fileList, postVars);
						}

						return toReturn;
					},

					_handleFileSelectQueue: function(event) {
						var filesPartition = event.filesList;

						this.getQueue()
					},

					_getUploadURL: function(folderId) {
						var instance = this;

						var uploadURL = instance.get('uploadURL');

						if (!uploadURL) {
							var redirect = instance.get('redirect');

							uploadURL = Liferay.Util.addParams(
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

					_getTargetFolderId: function(target) {
						var instance = this;

						var folderEntry = instance._getFolderEntryNode(target);

						var dataFolder = folderEntry && folderEntry.one('[data-folder-id]');

						return (dataFolder && Lang.toInt(dataFolder.attr('data-folder-id')) || instance.get(STR_FOLDER_ID));
					},

					cancelQueue: function(key) {

					},

					cancelAllQueues: function() {

					}
				}
			}
		);

		Liferay.UploadBase.UploadDataQueue = UploadDataQueue;
	},
	'',
	{
		requires: ['liferay-upload-base']
	}
);