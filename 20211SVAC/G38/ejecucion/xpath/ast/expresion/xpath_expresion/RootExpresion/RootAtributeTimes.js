"use strict";
class RootAtributeTimes extends ExpresionAncestor {
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
        let ts = ent.findAllAtributesInObjects();
        return PredicateExpresion.filterXpathExpresion(ts, this.predicatesList);
    }
}
