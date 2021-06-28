"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(id, tipo, valor, fila, columna, indice) {
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.entorno = [];
        if ('undefined' === typeof indice) {
            this.indice = '';
        }
        else {
            this.indice = indice.toString();
        }
    }
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };
    Simbolo.prototype.getValorImplicito = function () {
        return this.valor;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
