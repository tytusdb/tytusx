"use strict";
class RootAtributeIdentifier {
    constructor(identifier, predicatesList, linea, columna) {
        this.identifier = identifier;
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(ent) {
        let ts = ent.findAtributesByNombreElemento(this.identifier);
        return PredicateExpresion.filterXpathExpresion(ts, this.predicatesList);
    }
}
