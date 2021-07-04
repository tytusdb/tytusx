"use strict";
class Variable extends ExpresionAncestor {
    constructor(variable, linea, columna) {
        super();
        this.variable = variable;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, xmlData) {
        let simbolo = ent.obtenerSimbolo(this.variable);
        let tipo = new Tipo(TipoDato.err);
        if (simbolo != null)
            tipo = simbolo.tipo;
        return tipo;
    }
    getValor(ent, xmlData) {
        let simbolo = ent.obtenerSimbolo(this.variable);
        let valor = null;
        if (simbolo != null) {
            if (simbolo.tipo.esXpath())
                valor = simbolo.valorXpath;
            else
                valor = simbolo.valorPrimitvo;
        }
        return valor;
    }
    traducirRetorno3DXQuery(sizeScope, ambito) {
        return sizeScope;
    }
}
