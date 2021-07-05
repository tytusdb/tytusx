"use strict";

var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }

    Atributo.prototype.getID = function () {
        return this.identificador;
    };

    Atributo.prototype.getValor = function () {
        return this.valor;
    };
    return Atributo;
}());
