"use strict";
class Atribute extends ExpresionAncestor {
    constructor(axeType, axeOperation, identifier, listaPredicados, linea, columna) {
        super();
        this.axeType = axeType;
        this.axeOperation = axeOperation;
        this.identifier = identifier;
        this.listaPredicados = listaPredicados;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(tsXquery, ent) {
        let ts = new TablaSimbolos(null);
        switch (this.axeOperation) {
            case AxeOperation.identifier:
                ts = ent.findAtributesByNombreElemento(this.identifier);
                break;
            case AxeOperation.node:
            case AxeOperation.times:
                ts = ent.findAllAtributesInObjects();
                break;
            case AxeOperation.text:
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts, this.listaPredicados);
    }
}
