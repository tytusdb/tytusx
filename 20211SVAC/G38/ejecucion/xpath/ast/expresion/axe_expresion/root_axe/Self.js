"use strict";
class Self {
    constructor(axeType, axeOperation, identifier, listaPredicados, linea, columna) {
        this.axeType = axeType;
        this.axeOperation = axeOperation;
        this.identifier = identifier;
        this.listaPredicados = listaPredicados;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(ent) {
        let ts = new TablaSimbolos(null);
        switch (this.axeOperation) {
            case AxeOperation.identifier:
                ts = ent.findAllByNombreElemento(this.identifier);
                break;
            case AxeOperation.node:
            case AxeOperation.times:
                ts = ent;
                break;
            case AxeOperation.text:
                ts = ent.findAllObjectsOrAtributesWithText();
                break;
        }
        return ts;
    }
}
