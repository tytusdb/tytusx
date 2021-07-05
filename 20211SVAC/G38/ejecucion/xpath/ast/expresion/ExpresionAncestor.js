"use strict";
class ExpresionAncestor {
    constructor() {
        this.columna = null;
        this.linea = null;
    }
    getTipo(ent, xmlData) {
        return undefined;
    }
    getValor(ent, xmlData) {
    }
    traducir3D(ambito, sizeScope) {
        throw new Error("Metodo 'traducir' no implementado.");
    }
    traducir3DXQuery(sizeScope) {
        throw new Error("Metodo 'traducir' no implementado.");
    }
    traducirRetorno3DXQuery(sizeScope, ambito) {
        throw new Error("Metodo 'traducir' no implementado.");
    }
    crearListaC3D(sizeScope) {
        let tmpListaXpathXpressions = CodeUtil.generarTemporal();
        CodeUtil.printWithComment("SP = SP + " + sizeScope + " ;", "Se cambia ambito");
        CodeUtil.print("crearLista();");
        CodeUtil.print(tmpListaXpathXpressions + " = Stack[SP];");
        CodeUtil.printWithComment("SP = SP - " + sizeScope + " ;", "Se recupera ambito");
        return tmpListaXpathXpressions;
    }
    crearLista3D(sizeScope) {
        CodeUtil.printComment("Creamos una nueva lista para concatenar las respuesetas de XpathExpressions del return");
        let tmpListaXpathXpressions = CodeUtil.generarTemporal();
        CodeUtil.printWithComment("SP = SP + " + sizeScope + " ;", "Se cambia ambito");
        CodeUtil.print("crearLista();");
        CodeUtil.print(tmpListaXpathXpressions + " = Stack[SP];");
        CodeUtil.printWithComment("SP = SP - " + sizeScope + " ;", "Se recupera ambito");
        return tmpListaXpathXpressions;
    }
    concatenarLista3D(sizeScope, tmpListaXpathXpressions, nuevaLista) {
        CodeUtil.printWithComment("SP = SP + " + sizeScope + " ;", "Se cambia ambito");
        let tmpPosParametro1 = CodeUtil.generarTemporal();
        let tmpPosParametro2 = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosParametro1 + " = SP + 0 ; ");
        CodeUtil.print(tmpPosParametro2 + " = SP + 1 ; ");
        CodeUtil.print("Stack[(int)" + tmpPosParametro1 + "] = " + tmpListaXpathXpressions + " ;");
        CodeUtil.print("Stack[(int)" + tmpPosParametro2 + "] = " + nuevaLista + " ;");
        CodeUtil.printWithComment("concatenarListas();", "Concatenamos las listas Xpath");
        CodeUtil.print(tmpListaXpathXpressions + " = Stack[SP]; ");
        CodeUtil.printWithComment("SP = SP - " + sizeScope + " ;", "Se recupera ambito");
    }
    static imprimirLista3D(sizeScope, tmpListaXpathXpressions) {
        CodeUtil.printComment("Imprimimos lista resultante");
        CodeUtil.print("SP = SP + " + sizeScope + " ; ");
        //CodeUtil.guardarTemporales(tmpPosLista,tmpLista);
        CodeUtil.printWithComment("Stack[SP] = " + tmpListaXpathXpressions + "; ", "Imprimimos la lista");
        CodeUtil.print("imprimirListaObjetos();");
        //CodeUtil.recuperarTemporales(tmpPosLista,tmpLista);
        CodeUtil.print("SP = SP - " + sizeScope + " ; ");
    }
}
