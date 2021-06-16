"use strict";
exports.__esModule = true;
var NodoAST = /** @class */ (function () {
    function NodoAST(etiqueta) {
        this.etiqueta = etiqueta;
        this.hijos = new Array();
    }
    NodoAST.prototype.AgregarHijo = function (nuevo) {
        this.hijos.push(nuevo);
    };
    NodoAST.prototype.getHijos = function (nodo) {
        raiz = nodo;
    };
    return NodoAST;
}());
exports["default"] = NodoAST;
var raiz;
