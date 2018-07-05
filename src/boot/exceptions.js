/* globals define, require, $, Vue, axios */

define(function () {

	// DEFINE AS FUNCTION
	return function (src) {
		if (!src) {
			src = "";
		}

		// AJAX
		$(document).ajaxError(function (event, jqxhr) {
			errorHandle(jqxhr.responseText, jqxhr.status);
		});

		// AXIOS
		axios.interceptors.response.use(function (response) {
			return response;
		}, function (error) {
			errorHandle(error.response.data, error.response.status, error.response.statusText);
			return error.response;
		});

		// REQUIRE
		if (window.require) {
			require.config({
				config: {
					text: {
						onXhr: function (xhr) {
							xhr.onload = function () {
								if (xhr.status >= 400) {
									errorHandle(xhr.responseText, xhr.status, xhr.statusText);
								}
							};
						}
					}
				}
			});
		}

	};

	/*
	 * PRIVATE METHODS
	 */

	function errorHandle(response, status, thrownError) {

		// UNAUTHORIZED
		if (401 == status) {

			// LOGIN MODAL
			require(["vue!modules/modal.html"], function (Component) {

				// REMOVE ANY MODAL
				$(".modal").remove();
				$(".modal-backdrop").remove();

				var component = new Component();

				// STATIC MODAL
				component.data = component.data();
				component.data.options = {
					backdrop: "static",
					keyboard: false
				};

				var vm = new Vue(component);

				var div = $("<div>").appendTo("body")[0];
				vm.$mount(div);

				$(vm.$el).find(".modal-body").css({
					padding: 0
				});
				vm.page = "modules/views/login/login.html";
			});

			return;
		}

		var options = {
			type: "danger"
		};

		$.notify("<b>" + thrownError + "</b>: " + response, options);
	}

});
