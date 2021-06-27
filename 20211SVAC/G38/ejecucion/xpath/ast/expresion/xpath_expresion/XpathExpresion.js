"use strict";
class XpathExpresion {
    constructor(expresionesXpath, linea, columna) {
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ts, ent) {
        if (this.expresionesXpath.length == 1 && this.expresionesXpath[0] instanceof Variable)
            return this.expresionesXpath[0].getTipo(ts, ent);
        return new Tipo(TipoDato.err);
    }
    getValor(ts, ent) {
        let entornoActual = ent;
        for (let expresion of this.expresionesXpath) {
            if (entornoActual == undefined || entornoActual == null) {
                throw Error("Se devolvio tabla nula");
            }
            entornoActual = expresion.getValor(ts, entornoActual);
        }
        return entornoActual;
    }
}
