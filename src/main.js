/* globals define */

// NOT DEFINE - ALLOW LOAD WITHOUR REQUIRE.JS
window.main = function () {

	var config = {
		waitSeconds: 0, //prevent timeout by requirejs
		paths: {
			text: "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
			requirejs_css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css",
			vue: "https://cdn.rawgit.com/edgardleal/require-vuejs/aeaff6db/dist/require-vuejs" //Mismatched anonymous define() module
			,
			jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery",
			Vue2: "https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue",
			bootstrap: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.bundle",
			axioshttp: "https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min",
			popper: "https://unpkg.com/popper.js@1.12.6/dist/umd/popper",
			bootstrap_notify: "https://cdnjs.cloudflare.com/ajax/libs/mouse0270-bootstrap-notify/3.1.7/bootstrap-notify.min",
		},
		map: {
			"*": {
				requirejs_css: "requirejs_css"
			}
		},
		config: {
			text: {
				useXhr: function () {
					// allow cross-domain requests - remote server allows CORS
					return true;
				}
			}
		},
		shim: {
			notify: ["jquery"],
			bootstrap: ["jquery"],
			bootstrapMD: ["jquery", "bootstrap", "popper.js"]
		},
		exclude: ["requirejs_css/normalize"],
		catchError: true
	};

	// PRE-LOADINGS
	define("notify", ["bootstrap_notify"]); //(LOAD WITHOUT WAIT 'jquery')

	// DEFFINITIONS
	window.module = ""; //prevent import bugs
	define("Vue", ["Vue2"], function (vue) {
		window.Vue = vue;
		return vue;
	});
	define("axios", ["axioshttp"], function (axios) {
		window.axios = axios;
		return axios;
	});
	define("popper.js", ["popper"], function (popper) {
		window.Popper = popper;
		return popper;
	});

	var require_boot = [
		// CSS LIBS
		"requirejs_css!https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome",
		"requirejs_css!https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min", //"bootstrap_notify" NEED
		// PRE LOAD
		"jquery", "Vue", "axios", "notify"
	];

	// NOT ESSENTIAL AND DELAYABLE LIBS
	var require_delay = [
		"requirejs_css!https://cdn.rawgit.com/simpl-e/simple_vue_framework/master/src/styles/bootstrap-modal-pages",
		"bootstrap"
	];

	return {
		config: config,
		require_boot: require_boot,
		require_delay: require_delay
	};

};
