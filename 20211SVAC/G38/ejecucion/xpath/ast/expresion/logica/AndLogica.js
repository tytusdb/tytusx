"use strict";
class AndLogica {
    constructor(izquierdo, derecha, linea, columna) {
        this.izquierdo = izquierdo;
        this.derecha = derecha;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(ent) {
    }
}
