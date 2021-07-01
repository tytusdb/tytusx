"use strict";
exports.__esModule = true;
exports.For = void 0;
var For = /** @class */ (function () {
    function For(variable, variable2, condiciones, contenido, linea, columna) {
        this.variable = variable;
        this.variable2 = variable2;
        this.condiciones = condiciones;
        this.contenido = contenido;
        this.linea = linea;
        this.columna = columna;
    }
    For.prototype.insertSimbolsTable = function (node) {
        console.log("pasó por el for");
    };
    For.prototype.ejecutar = function (entorno) {
        throw new Error('Method not implemented.');
    };
    return For;
}());
exports.For = For;
