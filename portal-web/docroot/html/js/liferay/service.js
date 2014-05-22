AUI.add(
	'liferay-service',
	function(A) {
		var Lang = A.Lang;

		var owns = A.Object.owns;

		var isNode = function(node) {
			return node && (node._node || node.nodeType);
		};

		var REGEX_METHOD_GET = /^get$/i;

		var URL_INVOKE = themeDisplay.getPathContext() + '/api/jsonws/invoke';

		A.mix(
			A.namespace('config.io'),
			{
				method: 'POST',
				uriFormatter: function(value) {
					return Liferay.Util.getURLWithSessionId(value);
				}
			},
			true
		);

		/**
		 * OPTIONS
		 *
		 * Required
		 * service {string|object}: Either the service name, or an object with the keys as the service to call, and the value as the service configuration object.
		 *
		 * Optional
		 * data {object|node|string}: The data to send to the service. If the object passed is the ID of a form or a form element, the form fields will be serialized and used as the data.
		 * successCallback {function}: A function to execute when the server returns a response. It receives a JSON object as it's first parameter.
		 * exceptionCallback {function}: A function to execute when the response from the server contains a service exception. It receives a the exception message as it's first parameter.
		 */

		var Service = function(payload, ioConfig) {
			var instance = this;

			var args = Service.parseInvokeArgs(arguments);

			var cmd;

			try {
				cmd = A.JSON.stringify(args[0]);
			}
			catch (e) {
				Y.error('CMD error:', e, args[0]);
			}

			if (cmd) {
				return new A.Promise(
					function(resolve, reject) {
						var request = {
							data: {
								cmd: cmd,
								p_auth: Liferay.authToken
							},
							dataType: 'JSON',
							on: {
								success: function (id, response) {
									try {
										resolve(A.JSON.parse(response.responseText));
									}
									catch (e) {
										reject(e);
									}
								},
								failure: function (id, response) {
									reject(new Error('Service Failure: ' + response));
								}
							}
						};

						A.mix(request, args[1], true);

						A.io(URL_INVOKE, request);
					}
				);
			}
		};

		A.mix(
			Service,
			{
				bind: function() {
					var instance = this;

					var args = A.Array(arguments, 0, true);

					args.unshift(Liferay.Service, Liferay);

					return A.bind.apply(A, args);
				},

				parseInvokeArgs: function(args) {
					var instance = this;

					var payload = args[0];

					var ioConfig = instance.parseIOConfig(args);

					if (Lang.isString(payload)) {
						payload = instance.parseStringPayload(args);

						instance.parseIOFormConfig(ioConfig, args);

						var lastArg = args[args.length - 1];

						if (Lang.isObject(lastArg) && lastArg.method) {
							ioConfig.method = lastArg.method;
						}
					}

					return [payload, ioConfig];
				},

				parseIOConfig: function(args) {
					var instance = this;

					var payload = args[0];

					var ioConfig = payload.io || {};

					delete payload.io;

					if (!owns(ioConfig, 'cache') && REGEX_METHOD_GET.test(ioConfig.method)) {
						ioConfig.cache = false;
					}

					if (Liferay.PropsValues.NTLM_AUTH_ENABLED && Liferay.Browser.isIe()) {
						ioConfig.method = 'GET';
					}

					return ioConfig;
				},

				parseIOFormConfig: function(ioConfig, args) {
					var instance = this;

					var form = args[1];

					if (isNode(form)) {
						A.namespace.call(ioConfig, 'form');

						ioConfig.form.id = form._node || form;
					}
				},

				parseStringPayload: function(args) {
					var instance = this;

					var params = {};
					var payload = {};

					var config = args[1];

					if (config && !Lang.isFunction(config) && !isNode(config)) {
						params = config;
					}

					payload[args[0]] = params;

					return payload;
				}
			},
			true
		);

		A.each(
			['get', 'delete', 'post', 'put', 'update'],
			function(item, index, collection) {
				var methodName = item;

				if (item === 'delete') {
					methodName = 'del';
				}

				Service[methodName] = A.rbind(
					'Service',
					Liferay,
					{
						method: item
					}
				);
			}
		);

		Liferay.Service = Service;
	},
	'',
	{
		requires: ['io', 'json', 'promise']
	}
);