"use strict";
class AnyAncestor extends ExpresionAncestor {
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
        var ts = new TablaSimbolos(null);
        switch (this.axeType) {
            case AxeType.ancestorType:
                ts = this.getAncestors(ent);
                break;
            case AxeType.ancestoOrSelfType:
                ts = this.getAncestors(ent);
                ts.merge(ent);
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts, this.listaPredicados);
    }
    getAncestors(ent) {
        var ts = new TablaSimbolos(null);
        switch (this.axeOperation) {
            case AxeOperation.identifier:
                ts = ent.getElementsParentsByNombreElementoRecursive(this.identifier);
                break;
            case AxeOperation.node:
            case AxeOperation.times:
                ts = ent.getElementsParentsRecursive();
                break;
            case AxeOperation.text:
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede pedir un nodo texto para el axe parent", this.linea, this.columna));
                break;
        }
        return ts;
    }
}
