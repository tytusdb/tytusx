"use strict";

var XParametro = /** @class */ (function () {
    function XParametro(identificador, linea, columna, tipo) {
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.entorno = null;
    }
    XParametro.prototype.getTipo = function () {
        return this.tipo;
    };
    XParametro.prototype.getValorImplicito = function (entorno) {
        
    };

    XParametro.prototype.getID = function () {
        return this.identificador;
    };

    XParametro.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    return XParametro;
}());
