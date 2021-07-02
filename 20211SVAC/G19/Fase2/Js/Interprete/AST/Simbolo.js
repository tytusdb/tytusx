"use strict";

var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, linea, columna, valor, posicion,posicionH) {
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.posicion = posicion;
        this.posicionH = posicionH;
    }
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };

    Simbolo.prototype.SetearPosicion = function (pos) {
            this.posicion = pos;   
    };
    Simbolo.prototype.SetearPosicionH = function (pos) {
        this.posicionH = pos;   
};

    Simbolo.prototype.getPosicion = function () {
        return this.posicion;
    };
    Simbolo.prototype.getPosicionH = function () {
        return this.posicionH;
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

