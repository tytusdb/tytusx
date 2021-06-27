"use strict";
class Primitive {
    constructor(valor, tipo, linea, columna) {
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return this.tipo;
    }
    getValor(tsXquery, ent) {
        return this.valor;
    }
}
