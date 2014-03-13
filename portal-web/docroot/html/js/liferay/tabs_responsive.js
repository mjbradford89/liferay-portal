AUI.add(
	'liferay-tabs-responsive',
	function(A) {
		var NAV_STACKED = 'nav-stacked';

		var RESIZE = 'resize';

		var TabsResponsive = A.Component.create(
			{
				ATTRS: {
					delay: {
						validator: function(value) {
							return (A.Lang.isNumber(value) && value > -1);
						},
						value: 100
					},
					tabsList: {
						validator: function(value) {
							return !!A.one(value);
						},
						value: ''
					}
				},
				AUGMENTS: [],
				EXTENDS: A.Base,
				NAME: 'tabsresponsive',
				prototype: {
					initializer: function() {
						var instance = this;

						instance._tabsStackedHandler();

						instance._bindUI();
					},

					_bindUI: function() {
						var instance = this;

						var tabsStackedHandlerFn = A.bind(instance._tabsStackedHandler, instance);

						A.getWin().on(RESIZE, A.debounce(tabsStackedHandlerFn, instance.get('delay')));
					},

					_calculateAncestorWidth: function() {
						var instance = this;

						return instance._getAncestor().width();
					},

					_getAncestor: function() {
						var instance = this;

						var ancestor = instance._ancestor;

						if (!ancestor) {
							ancestor = instance.get('tabsList').ancestor();

							instance._ancestor = ancestor;
						}

						return ancestor;
					},

					_getTotalTabsWidth: function() {
						var instance = this;

						var totalTabsWidth = instance._totalTabsWidth;

						if (!totalTabsWidth) {
							totalTabsWidth = 0;

							instance.get('tabsList').all('> li').each(
								function(item, index, collection) {
									if (!item.hasClass('hide')) {
										totalTabsWidth += item.outerWidth(true);
									}
								}
							);

							var tabsListMarginHorizontal = instance.get('tabsList').getMargin('lr');

							totalTabsWidth += tabsListMarginHorizontal;

							instance._totalTabsWidth = totalTabsWidth;
						}

						return totalTabsWidth;
					},

					_tabsStackedHandler: function() {
						var instance = this;

						var ancestorWidth = instance._calculateAncestorWidth();

						var totalTabsWidth = instance._getTotalTabsWidth();

						var canFit = (ancestorWidth > totalTabsWidth);

						instance.get('tabsList').toggleClass(NAV_STACKED, !canFit);
					}
				}
			}
		);

		Liferay.TabsResponsive = TabsResponsive;
	},
	'',
	{
		requires: ['aui-base']
	}
);