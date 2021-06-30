"use strict";
exports.__esModule = true;
exports.If = void 0;
var If = /** @class */ (function () {
    function If(condicion, sentencias, sino, fila, columna) {
        this.condicicion = condicion;
        this.sentencias = sentencias;
        this.sino = sino;
        this.fila = fila;
        this.columna = columna;
    }
    If.prototype.insertSimbolsTable = function (node) {
        console.log("pasó por el if");
    };
    If.prototype.ejecutar = function (entorno) {
        throw new Error('Method not implemented.');
    };
    return If;
}());
exports.If = If;
