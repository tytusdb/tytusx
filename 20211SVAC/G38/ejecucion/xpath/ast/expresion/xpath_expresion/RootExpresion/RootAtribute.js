"use strict";
class RootAtribute {
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
        return ent.findAtributesByNombreElemento(this.identifier);
    }
}
