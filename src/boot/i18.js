/* global define, require */

define([
	window.simple_ + "/src/boot/utils.js"
], function (utils) {
	window.lang = utils.getUrlParameter(location.hash, "lang") ||
		window.navigator.userLanguage ||
		window.navigator.language ||
		"en";

	if (false !== window.lang.indexOf("-") >= 0 && 0 != window.lang.indexOf("zh")) {
		window.lang = window.lang.split("-").shift();
	}

	require(["i18n/" + window.lang], function (i18) {
		window.i18 = i18;
	});
});