"use strict";
class Primitive extends ExpresionAncestor {
    constructor(valor, tipo, linea, columna) {
        super();
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
