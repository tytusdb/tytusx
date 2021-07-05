"use strict";
class AnyAxeAtribute extends ExpresionAncestor {
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
                ts = ent.findAtributesByNombreElementoRecursive(this.identifier);
                break;
            case AxeOperation.node:
            case AxeOperation.times:
                ts = ent.findAllAtributesInObjectsRecursive();
                break;
            case AxeOperation.text:
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts, this.listaPredicados);
    }
    traducir3D(ambito, sizeScope) {
        let tmpresultado;
        switch (this.axeOperation) {
            case AxeOperation.identifier:
                tmpresultado = XpathUtil.anyIdentifier(ambito, sizeScope, this.identifier, TipoDato3D.atributo);
                break;
            case AxeOperation.node:
            case AxeOperation.times:
                break;
            case AxeOperation.text:
                break;
        }
        return tmpresultado;
    }
}
