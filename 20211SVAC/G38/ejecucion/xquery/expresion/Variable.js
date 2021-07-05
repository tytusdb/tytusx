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
        CodeUtil.printComment("Traduccion Variable.traducirRetorno3DXQuery(): " + this.variable);
        let local = false;
        let sFor = XQueryUtil.tablaSimbolosLocal.obtenerSimbolo(this.variable);
        if (sFor != null) {
            local = true;
        }
        else {
            let sFor = XQueryUtil.tablaSimbolosGlobal.obtenerSimbolo(this.variable);
        }
        if (sFor == null) {
            throw new TokenError(TipoError.Semantico, this.variable + " no existe. ", this.linea, this.columna);
        }
        let posicion = sFor.offset;
        let tmpPosicion = CodeUtil.generarTemporal();
        if (local) {
            CodeUtil.printWithComment(tmpPosicion + " = SP + " + posicion + "; ", "Obtiene temporal del ambiente local");
        }
        else {
            CodeUtil.printWithComment(tmpPosicion + " = " + posicion + " ; ", "Otiene temporal del ambiente global");
        }
        let tmpObjeto = CodeUtil.generarTemporal();
        CodeUtil.print(tmpObjeto + " = Stack[(int)" + tmpPosicion + "];");
        CodeUtil.printComment("Fin traduccion Variable.traducirRetorno3DXQuery(): " + this.variable);
        //return sizeScope;
        return tmpObjeto;
    }
}
