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
        let entornoActual = null;
        CodeUtil.print("");
        CodeUtil.printComment("Inicio de traduccion XpathExpresion");
        let tmpPadre = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPadre + " = -1 ;");
        for (let expression of this.expresionesXpath) {
            if (entornoActual == null) {
                entornoActual = expression.traducir3D(tmpPadre, sizeScope); //Si se ejecuta la primera vez
            }
            else {
                let nuevaLista = CodeUtil.generarTemporal();
                CodeUtil.print("SP = SP + " + sizeScope + ";");
                CodeUtil.print("crearLista();");
                CodeUtil.print(nuevaLista + " = Stack[SP]; ");
                CodeUtil.print("SP = SP - " + sizeScope + ";");
                let temp = CodeUtil.generarTemporal();
                CodeUtil.print(temp + " = " + entornoActual + ";");
                let lInicio = CodeUtil.generarEtiqueta();
                let lFinal = CodeUtil.generarEtiqueta();
                CodeUtil.print(lInicio + ":");
                let tmpPosObjeto = CodeUtil.generarTemporal();
                let tmpPosSiguienteObjeto = CodeUtil.generarTemporal();
                CodeUtil.printWithComment(tmpPosObjeto + " = " + temp + " ;", "Pos de la referencia al objeto de la lista");
                CodeUtil.printWithComment(tmpPosSiguienteObjeto + " = " + temp + " + 1 ;", "Pos de la ref al siguiente objeto");
                CodeUtil.print(tmpPadre + " = Heap[(int)" + temp + "] ;");
                CodeUtil.print("if ( " + tmpPadre + " == -1 ) goto " + lFinal + " ; ");
                entornoActual = expression.traducir3D(tmpPadre, sizeScope);
                CodeUtil.printComment("Guardamos entorno actual en la lsita en blanco ");
                CodeUtil.print("SP = SP + " + sizeScope + ";");
                CodeUtil.print("Stack[SP] = " + nuevaLista + ";");
                let tmp = CodeUtil.generarTemporal();
                CodeUtil.print(tmp + " = SP + 1 ;");
                CodeUtil.print("Stack[(int)" + tmp + "] = " + entornoActual + "; ");
                CodeUtil.print("concatenarListas();");
                CodeUtil.print(nuevaLista + " = Stack[SP];");
                CodeUtil.print("SP = SP - " + sizeScope + ";");
                CodeUtil.print(temp + " = " + tmpPosSiguienteObjeto + ";");
                CodeUtil.print("goto " + lInicio + "; ");
                CodeUtil.print(lFinal + ": ");
                entornoActual = nuevaLista;
            }
        }
        CodeUtil.printComment("Fin de traduccion XpathExpresion");
        CodeUtil.print("");
        return entornoActual;
    }
    traducirRetorno3DXQuery(sizeScope, ambito) {
        let entornoActual = null;
        CodeUtil.print("");
        CodeUtil.printComment("Inicio de traduccion traducirRetorno3DXQuery");
        let tmpPadre = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPadre + " = -1 ;");
        for (let expression of this.expresionesXpath) {
            if (entornoActual == null) {
                entornoActual = expression.traducirRetorno3DXQuery(ambito, sizeScope); //Si se ejecuta la primera vez
            }
            else {
                let nuevaLista = CodeUtil.generarTemporal();
                CodeUtil.print("SP = SP + " + sizeScope + ";");
                CodeUtil.print("crearLista();");
                CodeUtil.print(nuevaLista + " = Stack[SP]; ");
                CodeUtil.print("SP = SP - " + sizeScope + ";");
                let temp = CodeUtil.generarTemporal();
                CodeUtil.print(temp + " = " + entornoActual + ";");
                let lInicio = CodeUtil.generarEtiqueta();
                let lFinal = CodeUtil.generarEtiqueta();
                CodeUtil.print(lInicio + ":");
                let tmpPosObjeto = CodeUtil.generarTemporal();
                let tmpPosSiguienteObjeto = CodeUtil.generarTemporal();
                CodeUtil.printWithComment(tmpPosObjeto + " = " + temp + " ;", "Pos de la referencia al objeto de la lista");
                CodeUtil.printWithComment(tmpPosSiguienteObjeto + " = " + temp + " + 1 ;", "Pos de la ref al siguiente objeto");
                CodeUtil.print(tmpPadre + " = Heap[(int)" + temp + "] ;");
                CodeUtil.print("if ( " + tmpPadre + " == -1 ) goto " + lFinal + " ; ");
                entornoActual = expression.traducir3D(tmpPadre, sizeScope);
                CodeUtil.printComment("Guardamos entorno actual en la lsita en blanco ");
                CodeUtil.print("SP = SP + " + sizeScope + ";");
                CodeUtil.print("Stack[SP] = " + nuevaLista + ";");
                let tmp = CodeUtil.generarTemporal();
                CodeUtil.print(tmp + " = SP + 1 ;");
                CodeUtil.print("Stack[(int)" + tmp + "] = " + entornoActual + "; ");
                CodeUtil.print("concatenarListas();");
                CodeUtil.print(nuevaLista + " = Stack[SP];");
                CodeUtil.print("SP = SP - " + sizeScope + ";");
                CodeUtil.print(temp + " = " + tmpPosSiguienteObjeto + ";");
                CodeUtil.print("goto " + lInicio + "; ");
                CodeUtil.print(lFinal + ": ");
                entornoActual = nuevaLista;
            }
        }
        CodeUtil.printComment("Fin de traduccion traducirRetorno3DXQuery");
        CodeUtil.print("");
        return entornoActual;
    }
}
