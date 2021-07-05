"use strict";
class Primitive extends ExpresionAncestor {
    constructor(valor, tipo, linea, columna) {
        super();
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return this.tipo;
    }
    getValor(tsXquery, ent) {
        return this.valor;
    }
    traducir3D(ambito, sizeScope) {
        let temporal = CodeUtil.generarTemporal();
        if (this.tipo.esNumero()) {
            CodeUtil.printWithComment(temporal + " = " + this.valor + " ;", "Guardamos en un temporal el valor");
        }
        else {
            CodeUtil.printWithComment(temporal + " = -1 ;", "Valores no represntativos como indices, no implementado");
        }
        return temporal;
    }
    traducir3DXQuery(sizeScope) {
        if (this.tipo.esNumero()) {
            let temp = CodeUtil.generarTemporal();
            CodeUtil.print(temp + " = " + this.valor + ";");
            return new ExpresionC3D(temp);
        }
        else {
            let idTemp = CodeUtil.guardarTexto(this.valor);
            return new ExpresionC3D(idTemp);
        }
    }
}
