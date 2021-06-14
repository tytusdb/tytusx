"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predicado = void 0;
class Predicado {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        console.log("Predicado   " + valor);
    }
}
exports.Predicado = Predicado;
