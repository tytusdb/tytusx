"use strict";
class AnyNode {
    constructor(predicatesList, linea, columna) {
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(ent) {
        return ent.findAllSubObjects();
    }
}
