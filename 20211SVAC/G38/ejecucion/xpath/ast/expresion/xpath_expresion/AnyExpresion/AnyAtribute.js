"use strict";
class AnyAtribute {
    constructor(identifier, predicatesList, linea, columna) {
        this.identifier = identifier;
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.xpathValue);

    }
    getValor(ent) {
        return ent.findAtributesByNombreElementoRecursive(this.identifier);
    }
}
