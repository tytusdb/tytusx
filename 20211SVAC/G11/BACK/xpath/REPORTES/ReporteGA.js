"use strict";
exports.__esModule = true;
exports.ReporteGA = void 0;


var ReporteGA = /** @class */ (function () {
    function ReporteGA() {
        ReporteGA.r_gramatica = new Array();
    }
    ReporteGA.agregar = function (b, p, g) {
        var nuevo = new NodoReporte(b, p, g);
        ReporteGA.r_gramatica.unshift(nuevo);
    };
    ReporteGA.recorrer = function () {
        for (var i = 0; i < ReporteGA.r_gramatica.length; i++) {
            console.log(ReporteGA.r_gramatica[i].getbnf());
        }
    };
    ReporteGA.r_gramatica = new Array();
    return ReporteGA;
}());
exports.ReporteGA = ReporteGA;
