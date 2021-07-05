"use strict";
exports.__esModule = true;
exports.Instruccion = exports.xpathC3D = void 0;
var xpathC3D = /** @class */ (function () {
    function xpathC3D() {
        this.listaInstrucciones = [];
    }
    return xpathC3D;
}());
exports.xpathC3D = xpathC3D;
var Instruccion = /** @class */ (function () {
    function Instruccion(tipo, cadena) {
        this.tipo = tipo;
        this.cadena = cadena;
    }
    Instruccion.prototype.getTipo = function () {
        return this.tipo;
    };
    Instruccion.prototype.getCadena = function () {
        return this.cadena;
    };
    return Instruccion;
}());
exports.Instruccion = Instruccion;
