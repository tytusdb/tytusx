"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
var Nodo = /** @class */ (function () {
    function Nodo(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    Nodo.prototype.getFila = function () {
        return this.fila;
    };
    Nodo.prototype.getColumna = function () {
        return this.columna;
    };
    return Nodo;
}());
exports.Nodo = Nodo;
