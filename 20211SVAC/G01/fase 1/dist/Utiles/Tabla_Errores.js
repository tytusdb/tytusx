"use strict";
exports.__esModule = true;
exports.lerrores = exports.TablaError = void 0;
var TablaError = /** @class */ (function () {
    function TablaError(linea, columna, tipo, mensaje) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
    TablaError.prototype.setNumero = function (numero) {
        this.numero = numero;
    };
    return TablaError;
}());
exports.TablaError = TablaError;
exports.lerrores = new Array();
