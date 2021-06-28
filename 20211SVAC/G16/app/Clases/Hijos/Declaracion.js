"use strict";
exports.__esModule = true;
exports.Declaracion = void 0;
var Declaracion = /** @class */ (function () {
    function Declaracion(nombre, valor, linea, columna) {
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    Declaracion.prototype.ejecutar = function (entorno) {
    };
    return Declaracion;
}());
exports.Declaracion = Declaracion;
