"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, identificador, valor, fila, columna, entorno) {
        this.indentificador = identificador;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.entorno = entorno;
    }
    return Simbolo;
}());
exports.Simbolo = Simbolo;
