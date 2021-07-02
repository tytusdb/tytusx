"use strict";

var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.posicion = -1;
        this.posicionH = -1;
    }

    Atributo.prototype.SetearPosicion = function (pos) {
        if(this.posicion==-1){
            this.posicion = pos;
        }    
    };
    Atributo.prototype.SetearPosicionH = function (pos) {
        if(this.posicionH==-1){
            this.posicionH = pos;
        }    
    };
    Atributo.prototype.getPosicion = function () {
        return this.posicion;
    };   
    Atributo.prototype.getPosicionH = function () {
        return this.posicionH;
    };

    Atributo.prototype.getID = function () {
        return this.identificador;
    };

    Atributo.prototype.getValor = function () {
        return this.valor;
    };
    return Atributo;
}());
