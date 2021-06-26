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
        var ts = XpathUtil.crearTablaSimbolos([]);
        this.expresionesXpath.forEach(function (expresion) {
            let nuevoResultado = ts.listaSimbolos.concat(expresion.getValor(ent).listaSimbolos);
            ts.listaSimbolos = nuevoResultado;
        });
        return ts;
    }
    validarMerge(listaAntigua, listaNueva) {
        var tsAntigua = XpathUtil.crearTablaSimbolos(listaAntigua);
        var tsNueva = XpathUtil.crearTablaSimbolos(listaNueva);
        if (tsAntigua.isEqual(tsAntigua)) {
            return tsAntigua.listaSimbolos;
        }
        else {
            tsAntigua.merge(tsNueva);
            return tsAntigua.listaSimbolos;
        }
    }
}
