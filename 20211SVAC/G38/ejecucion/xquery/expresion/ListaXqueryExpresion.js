"use strict";
class ListaXqueryExpresion extends ExpresionAncestor {
    constructor(listaExpresiones, linea, columna) {
        super();
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, xmlData) {
        return undefined;
    }
    getValor(ent, xmlData) {
    }
}
