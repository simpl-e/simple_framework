/* globals define, require, $, Echo */

define([
	window.simple_ + "/src/boot/utils.js",
	"https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js",
	"https://cdn.jsdelivr.net/npm/laravel-echo@1.3.4/dist/echo.min.js"
], function (utils, io) {

	// DEFINE AS FUNCION
	return function (url) {

		var users = [];

		//https://laravel.com/docs/5.6/broadcasting
		var echo = new Echo({
			broadcaster: "socket.io",
			host: url,
			client: io
		});

		// PUBLIC CHANNELS:
		echo.channel("public").listen("PublicEvent", function (msg) {
			//console.log("PublicEvent", msg);
			require(function () {
				$.notify(msg);
			});
		});

		// AUTH CHANNELS
		var startWebsocket = function (token) {
			//ADD TOKEN
			echo.connector.options.auth = {
				headers: {
					Authorization: token
				}
			};

			// PRESENCE CHANNELS:
			echo.join("presence")
				.listen("PresenceEvent", function (msg) {
					//console.log("PresenceEvent", msg);
					$.notify(msg);
				})
				.here(function (channelUsers) {
					users = channelUsers;
					//console.log("join users", users);
				})
				.joining(function (user) {
					users.push(user);
					//console.log("joining user", user);
				})
				.leaving(function () {
					//console.log("leaving user", user);
				});

			// PRIVATE CHANNELS:
			var id = utils.getCookie("id");
			if (!id) {
				$.notify("missing getCookie('id');");
				return;
			}

			echo.private("private." + id).listen("PrivateEvent", function (data) {
				//console.log("UserEvent", data);

				// SHARED VARIABLES
				var i;

				if (data.msg) {
					// CONVERT TO ARRAY IF NOT
					if (data.msg.constructor !== Array) {
						data.msg = [data.msg];
					}

					// GET FULL ERROR
					for (i = 0; i < data.msg.length; i++) {
						var msg = data.msg[i];
						$.notify(msg);
					}
				}

				if (data.state) {
					for (var key in data.state) {
						var extend = $.extend(true, window.store.state[key], data.state[key]);
						window.globals.set(key, extend);
					}
				}

				// TODO: WHY AUTO BINDING IS NOT WORKING HERE?
				// UPDATE VUE
				window.vm.$forceUpdate();
				for (i = 0; i < window.vm.$children.length; i++) {
					window.vm.$children[i].$forceUpdate();
				}

			});
		};

		// IF ALREADY LOGED
		var token = utils.getCookie("Authorization");
		if (token) {
			token = token.replace("+", " ");
			startWebsocket(token);
		}

		// PUBLIC METHODS
		return {
			users: users,
			echo: echo,
			startWebsocket: startWebsocket
		};
	};
});