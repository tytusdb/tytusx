"use strict";
exports.__esModule = true;
exports.ReporteGD = void 0;

var ReporteGD = /** @class */ (function () {
    function ReporteGD() {
        ReporteGD.r_gramaticad = new Array();
    }
    ReporteGD.agregar = function (b, p) {
        var nuevo = new NodoReporte_1.NodoReporte(b, p);
        ReporteGD.r_gramaticad.unshift(nuevo);
    };
    ReporteGD.recorrer = function () {
        for (var i = 0; i < ReporteGD.r_gramaticad.length; i++) {
            console.log(ReporteGD.r_gramaticad[i].getbnf());
        }
    };
    ReporteGD.r_gramaticad = new Array();
    return ReporteGD;
}());
exports.ReporteGD = ReporteGD;
