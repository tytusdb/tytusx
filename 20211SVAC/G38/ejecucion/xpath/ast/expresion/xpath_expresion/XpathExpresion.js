"use strict";
class XpathExpresion {
    constructor(expresionesXpath, linea, columna) {
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(ent) {
        let entornoActual = ent;
        entornoActual.esGlobal = true;
        for (let expresion of this.expresionesXpath) {
            if (entornoActual == undefined || entornoActual == null) {
                throw Error("Se devolvio tabal nula");
            }
            entornoActual = expresion.getValor(entornoActual);
            if (!(expresion instanceof RootCurrent || expresion instanceof RootParent))
                entornoActual.esGlobal = false;
        }
        return entornoActual;
    }
}
