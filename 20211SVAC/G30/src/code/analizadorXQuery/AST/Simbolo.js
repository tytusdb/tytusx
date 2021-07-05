"use strict";
exports.__esModule = true;
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(id, tipo, linea, columna, valor) {
        this.identificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }
    Simbolo.prototype.getTipo = function (ent) {
        return this.tipo;
    };
    Simbolo.prototype.getValorImplicito = function (ent) {
        return this.valor;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
