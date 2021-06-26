"use strict";
class ListaXpathExpresion {
    constructor(expresionesXpath, linea, columna) {
        this.expresionesXpath = expresionesXpath;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ts, ent) {
        if (this.expresionesXpath.length == 1) {
            let tipo = this.expresionesXpath[0].getTipo(ts, ent);
            if (!tipo.esError())
                return tipo;
        }
        return new Tipo(TipoDato.xpathValue);
    }
    getValor(tsXquery, ent) {
        var ts = XpathUtil.crearTablaSimbolos([]);
        this.expresionesXpath.forEach(function (expresion) {
            let valorExpresion = expresion.getValor(tsXquery, ent);
            if (valorExpresion instanceof TablaSimbolos) {
                let nuevoResultado = ts.listaSimbolos.concat(valorExpresion.listaSimbolos);
                ts.listaSimbolos = nuevoResultado;
            }
            else {
                ts = valorExpresion;
            }
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
