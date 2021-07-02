"use strict";
class RootParent extends ExpresionAncestor {
    constructor(predicatesList, linea, columna) {
        super();
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(tsXquery, ent) {
        let ts = ent.findAllParents();
        return PredicateExpresion.filterXpathExpresion(ts, this.predicatesList);
    }
}
