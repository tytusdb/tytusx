"use strict";
exports.__esModule = true;
exports.NodoReporte = void 0;
var NodoReporte = /** @class */ (function () {
    function NodoReporte(b, p, gra) {
        this.bnf = b;
        this.precedencia = p;
        this.grafo = gra;
    }
    NodoReporte.prototype.getbnf = function () {
        return this.bnf;
    };
    NodoReporte.prototype.getpre = function () {
        return this.precedencia;
    };
    NodoReporte.prototype.getgrafo = function () {
        return this.grafo;
    };
    return NodoReporte;
}());
exports.NodoReporte = NodoReporte;
