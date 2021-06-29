"use strict";
exports.__esModule = true;
exports.Funciones = void 0;
var ConsultasTS_js_1 = require("./ConsultasTS.js");
var Funciones = /** @class */ (function () {
    function Funciones(fn) {
        this.funcion = fn;
    }
    Funciones.prototype.execute = function (padre) {
        switch (this.funcion) {
            case "last":
                var etiqueta = localStorage.getItem("idtmp");
                var consulta = new ConsultasTS_js_1.ConsultasTS();
                var x = consulta.getEntornoActual(etiqueta, padre);
                return x.length;
            case "position":
                return 1;
            case "node":
                break;
            case "text":
                break;
        }
        return "F";
    };
    return Funciones;
}());
exports.Funciones = Funciones;
