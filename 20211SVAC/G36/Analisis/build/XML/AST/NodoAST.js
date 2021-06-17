"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodoAST = void 0;
var NodoAST = /** @class */ (function () {
    function NodoAST(dato) {
        this.dato = dato;
        this.hijos = [];
    }
    NodoAST.prototype.addHijo = function (dato) {
        this.hijos.push(dato);
    };
    NodoAST.prototype.getDato = function () {
        return this.dato;
    };
    NodoAST.prototype.getHojas = function () {
        return this.hijos;
    };
    return NodoAST;
}());
exports.NodoAST = NodoAST;
