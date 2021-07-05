"use strict";
class Declaracion {
    constructor(variable, expresion, linea, columna) {
        this.variable = variable;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let tipo = this.expresion.getTipo(ent, xmlData);
        let valor;
        if (!tipo.esError()) {
            valor = this.expresion.getValor(ent, xmlData);
            if (tipo.esXpath()) {
                let primitivo = XpathUtil.obtenerPrimitivoFromXpath(valor);
                if (primitivo != null && primitivo != undefined) {
                    tipo = primitivo.getTipo(null, null);
                    valor = primitivo.getValor(null, null);
                }
            }
            if (!XpathUtil.createSimbolo(this.variable, valor, tipo, ent, xmlData)) {
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se pudo guardar la variable con nombre " + this.variable
                    + " porque ya ha sido declarada", this.linea, this.columna));
            }
        }
        else {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se pudo guardar la variable con nombre " + this.variable
                + " porque la expresion es invalida", this.linea, this.columna));
        }
    }
    traducirXQ(sizeScope, otro) {
        CodeUtil.printComment("Traduccion Declaracion.traducirXQ(): " + this.variable);
        let local = false;
        let sFor = XQueryUtil.tablaSimbolosLocal.obtenerSimbolo(this.variable);
        if (sFor != null) {
            local = true;
        }
        else {
            let sFor = XQueryUtil.tablaSimbolosGlobal.obtenerSimbolo(this.variable);
        }
        if (sFor == null) {
            throw new TokenError(TipoError.Semantico, this.variable + " no existe en ts. ", this.linea, this.columna);
        }
        let posicion = sFor.offset;
        let tmpPosicion = CodeUtil.generarTemporal();
        if (local) {
            CodeUtil.printWithComment(tmpPosicion + " = SP + " + posicion + "; ", "Obtiene temporal del ambiente local");
        }
        else {
            CodeUtil.printWithComment(tmpPosicion + " = " + posicion + " ; ", "Otiene temporal del ambiente global");
        }
        CodeUtil.print("Stack[(int)" + tmpPosicion + "] = -1 ;");
        let exp = this.expresion.traducir3DXQuery(sizeScope);
        let tmpListElement;
        if (exp instanceof ExpresionC3D) {
            if (exp.idResultado == null) {
                CodeUtil.printWithComment(exp.imprimirVerdaderas() + ":", "Etiquetas Verdaderas");
                CodeUtil.print("Stack[(int)" + tmpPosicion + "] = 1 ;");
                CodeUtil.printWithComment(exp.imprimirFalsas() + ":", "Etiquetas Falsas");
                CodeUtil.print("Stack[(int)" + tmpPosicion + "] = 0 ;");
            }
            else {
                let tmpObjeto = CodeUtil.guardarPrimitivoEnHeap(exp.idResultado, this.expresion.getTipo(null, null));
                let tmpLista = CodeUtil.guardarRerenciaEnLista(tmpObjeto, sizeScope);
                tmpListElement = tmpLista;
                CodeUtil.print("Stack[(int)" + tmpPosicion + "] = " + tmpListElement + " ;");
            }
        }
        else {
            tmpListElement = exp;
            CodeUtil.print("Stack[(int)" + tmpPosicion + "] = " + tmpListElement + " ;");
        }
        CodeUtil.printComment("Fin traduccion Declaracion.traducirXQ(): " + this.variable);
        return tmpListElement;
    }
}
