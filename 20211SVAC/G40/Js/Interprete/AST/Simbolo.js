"use strict";

var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, linea, columna, valor) {
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }
    Simbolo.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };

    Simbolo.prototype.getID = function () {
        return this.indentificador;
    };

    Simbolo.prototype.getFila = function () {
        return this.linea;
    };

    Simbolo.prototype.getColumna = function () {
        return this.columna;
    };

    Simbolo.prototype.getValor = function () {
        return this.valor;
    };

    Simbolo.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    return Simbolo;
}());

