"use strict";
class Relational {
    constructor(izquierdo, derecha, relationalOperator, linea, columna) {
        this.izquierdo = izquierdo;
        this.derecha = derecha;
        this.relationalOperator = relationalOperator;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(ent) {
    }
}
