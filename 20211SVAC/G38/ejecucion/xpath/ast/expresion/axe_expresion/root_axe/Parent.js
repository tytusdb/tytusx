"use strict";
class Parent extends ExpresionAncestor {
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
        return new Tipo(TipoDato.xpathValue);
    }
    getValor(tsXquery, ent) {
        let ts = new TablaSimbolos(null);
        switch (this.axeOperation) {
            case AxeOperation.identifier:
                ts = ent.getElementsParentsByNombreElemento(this.identifier);
                break;
            case AxeOperation.node:
            case AxeOperation.times:
                ts = ent.getElementsParents();
                break;
            case AxeOperation.text:
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede pedir un nodo texto para el axe parent", this.linea, this.columna));
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts, this.listaPredicados);
    }
}
