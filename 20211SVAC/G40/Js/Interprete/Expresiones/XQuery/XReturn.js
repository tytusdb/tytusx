"use strict";

var XReturn = /** @class */ (function () {
    function XReturn(linea, columna, expresion, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = tipo;
        this.entorno = null;
    }
    XReturn.prototype.getTipo = function () {
        return this.tipo;
    };
    XReturn.prototype.getValorImplicito = function (entorno) {

        this.entorno = entorno;
        return this.expresion.getValorImplicito(entorno);
    
    };
    XReturn.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    XReturn.prototype.getEntorno = function () {
        return this.entorno;
    };

    return XReturn;
}());

