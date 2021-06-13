"use strict";
exports.__esModule = true;
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, linea, columna) {
        this.iden = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }
    Simbolo.prototype.obtenerTipo = function (ent, arbol) {
        return this.tipo;
    };
    Simbolo.prototype.obtenerValor = function (ent, arbol) {
        return this.valor;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
