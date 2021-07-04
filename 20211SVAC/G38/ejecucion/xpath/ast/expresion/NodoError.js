"use strict";
class NodoError extends ExpresionAncestor {
    constructor(linea, columna) {
        super();
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(tsXquery, ent) {
    }
}
