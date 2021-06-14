"use strict";
class AnyIdentifier {
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
        let ts = ent.findAllObjectsByNombreElemento(this.identifier);
        if (!ts.esVacia())
            this.predicatesList.forEach(function (expresion) {
                expresion.getValor(ts);
            });
        return ts;
    }
}
