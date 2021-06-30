"use strict";
exports.__esModule = true;
exports.Atributo = void 0;
var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.posicion = -1;
    }
    Atributo.prototype.getId = function () {
        return this.identificador;
    };
    ;
    Atributo.prototype.getValor = function () {
        return this.valor;
    };
    ;
    Atributo.prototype.setPosicion = function (pos) {
        if (this.posicion == -1)
            this.posicion = pos;
    };
    ;
    return Atributo;
}());
exports.Atributo = Atributo;
