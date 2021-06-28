"use strict";
exports.__esModule = true;
var Raiz = /** @class */ (function () {
    function Raiz(nombre) {
        this.lista = new Array();
        this.nombre = nombre;
    }
    Raiz.prototype.agregarHijo = function (elemento) {
        this.lista.push(elemento);
    };
    Raiz.prototype.getLista = function () {
        return this.lista;
    };
    Raiz.prototype.getNombre = function () {
        return this.nombre;
    };
    return Raiz;
}());
exports["default"] = Raiz;
