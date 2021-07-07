"use strict";
exports.__esModule = true;
exports.Nodo = void 0;
var Nodo = /** @class */ (function () {
    function Nodo(ide, nom, val, fila, columna) {
        this.id = ide;
        this.nombre = nom;
        this.valor = val;
        this.linea = fila;
        this.columna = columna;
        this.hijos = [];
    }
    Nodo.prototype.NuevoHijo = function (hijo) {
        this.hijos.push(hijo);
    };
    Nodo.prototype.imprimir = function () {
        console.log(this.id + '-*' + this.nombre);
        this.hijos.forEach(function (element) {
            if (element.valor == '') {
                element.imprimir();
            }
            else {
                console.log(element.valor + '*-' + element.id);
            }
        });
    };
    return Nodo;
}());
exports.Nodo = Nodo;
