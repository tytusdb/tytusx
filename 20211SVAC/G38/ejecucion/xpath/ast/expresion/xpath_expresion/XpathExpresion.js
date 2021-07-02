"use strict";
class XpathExpresion extends ExpresionAncestor {
    constructor(expresionesXpath, linea, columna) {
        super();
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
    traducir3D(ambito, sizeScope) {
        let entornoActual = ambito;
        for (let expression of this.expresionesXpath) {
            if (ambito == undefined || ambito == null) {
                throw Error("Ambito es nulo");
            }
            entornoActual = expression.traducir3D(ambito, sizeScope);
        }
        return entornoActual;
    }
}
