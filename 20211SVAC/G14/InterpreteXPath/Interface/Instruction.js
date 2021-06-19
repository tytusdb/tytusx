"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
var Instruccion = /** @class */ (function () {
    function Instruccion(columna) {
        this.columna = columna;
    }
    Instruccion.prototype.setSalida = function (salida) {
        this.salida = salida;
    };
    Instruccion.prototype.getSalida = function () {
        return this.salida;
    };
    return Instruccion;
}());
exports.Instruccion = Instruccion;
