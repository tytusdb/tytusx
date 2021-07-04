"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodoAST = /** @class */ (function () {
    function NodoAST(valor) {
        this.hijos = new Array();
        this.valor = valor;
    }
    NodoAST.prototype.addHijos = function (hijos) {
        this.hijos = hijos;
    };
    NodoAST.prototype.addHijo = function (hijo) {
        this.hijos.push(hijo);
    };
    NodoAST.prototype.addHijoSimple = function (hijo) {
        this.hijos.push(new NodoAST(hijo));
    };
    NodoAST.prototype.getValor = function () {
        return this.valor;
    };
    NodoAST.prototype.setValor = function (cad) {
        this.valor = cad;
    };
    NodoAST.prototype.getHijos = function () {
        return this.hijos;
    };
    return NodoAST;
}());
exports.default = NodoAST;
