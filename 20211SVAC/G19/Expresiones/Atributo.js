"use strict";
var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna, entornoAnterior) {
        this.id = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.entornoAnterior = entornoAnterior;
    }
    Atributo.prototype.getId = function () {
        return this.id;
    };
    Atributo.prototype.getValor = function () {
        return this.valor;
    };
    Atributo.prototype.getLinea = function () {
        return this.linea;
    };
    Atributo.prototype.getColumna = function () {
        return this.columna;
    };
    return Atributo;
}());
//# sourceMappingURL=Atributo.js.map