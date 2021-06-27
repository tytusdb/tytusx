"use strict";
class RootIdentifier {
    constructor(identifier, predicatesList, linea, columna) {
        this.identifier = identifier;
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(tsXquery, ent) {
        let ts = ent.findObjectsByNombreElemento(this.identifier);
        return PredicateExpresion.filterXpathExpresion(ts, this.predicatesList);
    }
}
