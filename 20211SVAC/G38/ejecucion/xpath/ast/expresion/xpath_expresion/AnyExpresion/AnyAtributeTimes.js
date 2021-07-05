"use strict";
class AnyAtributeTimes extends ExpresionAncestor {
    constructor(predicatesList, linea, columna) {
        super();
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(tsXquery, ent) {
        let ts = ent.findAllAtributesInObjectsRecursive();
        return PredicateExpresion.filterXpathExpresion(ts, this.predicatesList);
    }
    traducir3D(ambito, sizeScope) {
        let resultado = "";
        resultado = XpathUtil.anyType(sizeScope, ambito, "NA", TipoDato3D.atributo);
        return resultado;
    }
}
