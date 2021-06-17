"use strict";
class AtributeNode {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.xpathValue);

    }
    getValor(ent) {
    }
}
