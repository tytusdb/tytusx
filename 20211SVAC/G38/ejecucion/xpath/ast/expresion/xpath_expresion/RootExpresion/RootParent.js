"use strict";
class RootParent {
    constructor(predicatesList, linea, columna) {
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(ent) {
        let ts = ent.findAllParents();
        return PredicateExpresion.filterXpathExpresion(ts, this.predicatesList);
    }
}
