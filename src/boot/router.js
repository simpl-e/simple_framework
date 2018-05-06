/* ENRUTADOR BASADO EN HASH '#vista=[...]' */

define(function () {

    window.router = {
        src: window.src ? window.src : "src",
        actualizar: function (def) {
            var vista = _getNombreVista(def);
            this.cargar(vista);
        },
        cargar: function (vista) {
            if (!vista) {
                return;
            }

            var url = window.src + '/modulos/vista/' + vista + '/' + vista + '.html';

            require(["vue!" + url], function (vista) {
                window.app = new Vue(vista).$mount('#app > *:first-child');
            });
        }
    }

    //DEFINIR COMO FUNCION
    return function () {
        //HASH CHANGE EVENT
        $(window).on("hashchange", function () {
            window.router.actualizar();
        });

        //AUTO-INICIALIZAR:
        window.router.actualizar('inicio');
    };

    //OBTENER EL MÓDULO VISTA
    function _getNombreVista(def) {

        var hash = _getUrlParameter(location.hash, "view") || def;
        if (!hash) {
            return;
        }

        //AÑADIR CLASE 'vista_'
        //https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
        $("html").removeClass(function (index, className) {
            return (className.match(/(^|\s)vista_\S+/g) || []).join(' ');
        });
        $("html").addClass("vista_" + hash);

        return hash;
    }

    //OBTENER PARAMETRO DEL QUERY URL
    //https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
    function _getUrlParameter(str, sParam) {
        var sPageURL = decodeURIComponent(str.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
});
