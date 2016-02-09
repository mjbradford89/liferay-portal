AUI.add(
	'liferay-icon',
	function(A) {
		var Icon = {
			register: function(config) {
				var instance = this;

				var id = '#' + config.id;

				var forcePost = config.forcePost;
				var src = config.src;
				var srcHover = config.srcHover;
				var useDialog = config.useDialog;

				var delegateNode = instance._findSuitableDelegateNode(id);

				if (srcHover) {
					instance._onMouseOver = A.rbind('_onMouseHover', instance, srcHover);
					instance._onMouseOut = A.rbind('_onMouseHover', instance, src);

					instance._eventHandles.push(delegateNode.delegate('hover', instance._onMouseOver, instance._onMouseOut, id));
				}

				if (useDialog) {
					instance._eventHandles.push(delegateNode.delegate('click', instance._useDialog, id));
				}
				else if (forcePost) {
					instance._eventHandles.push(delegateNode.delegate('click', instance._forcePost, id));
				}
			},

			_findSuitableDelegateNode: function(id) {
				var instance = this;

				var childNode = A.one(id);
				var delegateNode = null;

				if (childNode) {
					delegateNode = childNode.ancestor(
						function(parentNode) {
							if (parentNode.hasClass('dropdown') ||
								parentNode.hasClass('list-group-item') ||
								parentNode.hasClass('portlet-body')) {

								return true;
							}
						}
					);
				}

				if (delegateNode == null) {
					delegateNode = A.getDoc();
				}

				return delegateNode;
			},

			_forcePost: function(event) {
				var instance = this;

				if (!Liferay.Surface || !Liferay.Surface.app) {
					Liferay.Util.forcePost(event.currentTarget);

					event.preventDefault();
				}
			},

			_onMouseHover: function(event, src) {
				var instance = this;

				var img = event.currentTarget.one('img');

				if (img) {
					img.attr('src', src);
				}
			},

			_onSurfaceEndNavigate: function(id) {
				var instance = this;

				var remainingEventHandles = A.Array.filter(
					instance._eventHandles,
					function(handle) {
						var id = handle.sub.filter;

						if (A.one(id) == null) {
							handle.detach();

							return false;
						}

						return true;
					}
				);

				instance._eventHandles = remainingEventHandles;
			},

			_useDialog: function(event) {
				Liferay.Util.openInDialog(
					event,
					{
						dialogIframe: {
							bodyCssClass: 'dialog-with-footer'
						}
					}
				);
			},

			_eventHandles: []
		};

		Liferay.Icon = Icon;

		if (Liferay.PropsValues.SINGLE_PAGE_APPLICATION_ENABLED) {
			Liferay.on('surfaceEndNavigate', Liferay.Icon._onSurfaceEndNavigate, Liferay.Icon);
		}
	},
	'',
	{
		requires: ['aui-base', 'liferay-util-window']
	}
);