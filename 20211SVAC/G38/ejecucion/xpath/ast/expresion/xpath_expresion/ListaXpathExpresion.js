"use strict";
class ListaXpathExpresion {
    constructor(expresionesXpath, linea, columna) {
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ts, ent) {
        return new Tipo(TipoDato.xpathValue);
    }
    getValor(tsXquery, ent) {
        var ts = XpathUtil.crearTablaSimbolos([]);
        this.expresionesXpath.forEach(function (expresion) {
            let nuevoResultado = ts.listaSimbolos.concat(expresion.getValor(tsXquery, ent).listaSimbolos);
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
