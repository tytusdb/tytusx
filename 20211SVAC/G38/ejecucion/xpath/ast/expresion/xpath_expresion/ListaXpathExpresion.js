"use strict";
class ListaXpathExpresion {
    constructor(expresionesXpath, linea, columna) {
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.xpathValue);
    }
    getValor(ent) {
        var ts = new TablaSimbolos(null);
        this.expresionesXpath.forEach(function (expresion) {
            //concatenar salidas
            ts.listaSimbolos = ts.listaSimbolos.concat(expresion.getValor(ent).listaSimbolos);
        });
        ts.replaceAtributesWithObjects();
        return ts.toStr();
    }
}
