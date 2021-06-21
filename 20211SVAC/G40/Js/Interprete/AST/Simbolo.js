"use strict";

var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, linea, columna, valor, posicion) {
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.posicion = posicion;
    }
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };

    Simbolo.prototype.SetearPosicion = function (pos) {
        if(this.posicion==-1){
            this.posicion = pos;
        }    
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

