"use strict";
class AnyText {
    constructor(predicatesList, linea, columna) {
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(tsXquery, ent) {
        let ts = ent.findAllSubTextInTS();
        return PredicateExpresion.filterXpathExpresion(ts, this.predicatesList);
    }
}
