/* globals require, define */

require.config({
	waitSeconds: 0, //prevent timeout by requirejs
	paths: {
		css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css",
		vue: "https://cdn.rawgit.com/edgardleal/require-vuejs/aeaff6db/dist/require-vuejs" //Mismatched anonymous define() module
		,
		jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery",
		Vue2: "https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue",
		bootstrap: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.bundle",
		axioshttp: "https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min",
		bootstrapMD: "https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.4.4/js/mdb.min",
		popper: "https://unpkg.com/popper.js@1.12.6/dist/umd/popper",
		bootstrap_notify: "https://cdnjs.cloudflare.com/ajax/libs/mouse0270-bootstrap-notify/3.1.7/bootstrap-notify.min",
		io: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io",
		"laravel-echo": "https://cdn.jsdelivr.net/npm/laravel-echo@1.3.4/dist/echo.min",
		raty: "lib/raty/jquery.raty.js"
	},
	map: {
		"*": {
			css: "css"
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
	exclude: ["require-css/normalize"],
	catchError: true
});

require.config({
	waitSeconds: 0, //prevent timeout by requirejs
	paths: {
		text: "lib/requirejs/text",
		propertyParser: "lib/requirejs/propertyParser", //font plugin needed!
		font: "lib/requirejs/font",
		css: "lib/requirejs/css.min",
		//        vue: 'lib/requirejs/require-vuejs.min'
		vue: "lib/requirejs/requirejs-vue"
	},
	config: {
		text: {
			useXhr: function () {
				// allow cross-domain requests - remote server allows CORS
				return true;
			}
		}
	}
});


//ESTO NO PERMITE A CHROME PARA EN LA EXCEPCION
// requirejs.onError = function (err) {
//     console.log("onError", err);
// };

//PRE-LOADINGS
define("notify", ["bootstrap_notify"]); //(LOAD WITHOUT WAIT 'jquery')

//DEFFINITIONS
window.module = "";
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

require([
	//BOOT
	"../src/boot/exceptions",
	"../src/boot/websocket",
	"../src/boot/router",
	"../src/boot/store",
	"../src/boot/i18",
	"../src/boot/instagram",
	"../src/boot/utils",
	"../src/boot/env",
	//CSS LIBS
	//"css!https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min",
	"css!https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min",
	"css!https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome",
	"css!https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min", //"bootstrap_notify" NEED
	"css!styles/styles.css",
	//PRE LOAD
	"jquery", "Vue", "axios", "notify", "raty"
], function (exceptions, websocket, router) {
	exceptions();
	websocket();

	//init:
	if (window.router_override) {
		window.router_override();
	} else {
		router();
	}
});

/* NOT ESSENTIAL AND DELAYABLE LIBS */
require([
	"css!../../libs/bootstrap-modal-pages",
	"bootstrap",
	"bootstrapMD"
]);