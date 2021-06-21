"use strict";

var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.posicion = -1;
    }

    Atributo.prototype.SetearPosicion = function (pos) {
        if(this.posicion==-1){
            this.posicion = pos;
        }    
    };

    Atributo.prototype.getPosicion = function () {
        return this.posicion;
    };   

    Atributo.prototype.getID = function () {
        return this.identificador;
    };

    Atributo.prototype.getValor = function () {
        return this.valor;
    };
    return Atributo;
}());
