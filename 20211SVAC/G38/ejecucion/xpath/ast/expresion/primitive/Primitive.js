"use strict";
class Primitive {
    constructor(valor, tipo, linea, columna) {
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return this.tipo;
    }
    getValor(ent) {
        return this.valor;
    }
}
