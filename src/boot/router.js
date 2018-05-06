/*
 * BASIC ROUTER HASH BASED '#view=[...]'
 */

/* globals define, require, $, Vue */

define(function () {

	window.router = {
		src: window.src ? window.src : "src",
		update: function (def) {
			var view = _getViewName(def);
			this.load(view);
		},
		load: function (view) {
			if (!view) {
				return;
			}

			var url = this.src + "/modules/view/" + view + "/" + view + ".html";

			require(["vue!" + url], function (view) {
				window.app = new Vue(view).$mount("#app > *:first-child");
			});
		}
	};

	/*
	 * PRIVATE FUNCTIONS:
	 */

	// FUNCTION DEFINITION
	return function () {
		// HASH CHANGE EVENT
		$(window).on("hashchange", function () {
			window.router.update();
		});

		// AUTO-INIT:
		window.router.update("home");
	};

	// GET VIEW MODULE
	function _getViewName(def) {

		var hash = _getUrlParameter(location.hash, "view") || def;
		if (!hash) {
			return;
		}

		// ADD 'view_' CLASS
		//https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
		$("html").removeClass(function (index, className) {
			return (className.match(/(^|\s)view_\S+/g) || []).join(" ");
		});
		$("html").addClass("view_" + hash);

		return hash;
	}

	// GET QUERY URL PARAM
	//https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
	function _getUrlParameter(str, sParam) {
		var sPageURL = decodeURIComponent(str.substring(1)),
			sURLVariables = sPageURL.split("&"),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split("=");

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	}
});