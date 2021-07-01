"use strict";
exports.__esModule = true;
var Nodo = /** @class */ (function () {
    function Nodo(etiqueta, valor) {
        this.Etiqueta = etiqueta;
        this.Valor = valor;
        this.Hijos = new Array();
    }
    Nodo.prototype.AgregarHijo = function (nodohijo) {
        this.Hijos.push(nodohijo);
    };
    return Nodo;
}());
exports["default"] = Nodo;
