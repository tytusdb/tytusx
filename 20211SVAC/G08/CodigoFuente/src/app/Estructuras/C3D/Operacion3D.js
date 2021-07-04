"use strict";
exports.__esModule = true;
exports.Simbolo = exports.OperacionC3D = void 0;
var OperacionC3D = /** @class */ (function () {
    function OperacionC3D(fila, columna, tipoOperador, expresionIzquierda, expresionDerecha, c3d) {
        this.Valor = '';
        this.Fila = fila;
        this.Columna = columna;
        this.TipoOperador = tipoOperador;
        this.ExpresionIzquierda = expresionIzquierda;
        this.ExpresionDerecha = expresionDerecha;
        this.C3D = c3d;
    }
    return OperacionC3D;
}());
exports.OperacionC3D = OperacionC3D;
var Simbolo = /** @class */ (function () {
    function Simbolo(fila, columna, valor, c3d, tipoDato, tipoParametro) {
        this.Fila = fila;
        this.Columna = columna;
        this.Valor = valor;
        this.C3D = c3d;
        this.TipoDato = tipoDato;
        this.TipoParametro = tipoParametro;
    }
    return Simbolo;
}());
exports.Simbolo = Simbolo;
