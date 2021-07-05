"use strict";
class AnyAtributeIdentifier extends ExpresionAncestor {
    constructor(identifier, predicatesList, linea, columna) {
        super();
        this.identifier = identifier;
        this.predicatesList = predicatesList;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(tsXquery, ent) {
        let ts = ent.findAtributesByNombreElementoRecursive(this.identifier);
        return PredicateExpresion.filterXpathExpresion(ts, this.predicatesList);
    }
    traducir3D(ambito, sizeScope) {
        CodeUtil.printComment("Traduccion de RootIdentifier :" + this.identifier);
        let posCadena = CodeUtil.guardarTexto(this.identifier);
        CodeUtil.printComment("Buscamos en la lista por nombre");
        CodeUtil.printWithComment("SP = SP + " + sizeScope + " ;", "Cambiamos ambito");
        //Calculamos las posiciones
        let tmpPosPar1 = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosPar1 + "= SP + 0 ;");
        let tmpPosPar2 = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosPar2 + "= SP + 1 ;");
        let tmpPosPar3 = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosPar3 + "= SP + 2 ;");
        let tmpPosPar4 = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosPar4 + "= SP + 3 ;");
        //Pasamos los parametros
        CodeUtil.print("Stack[(int)" + tmpPosPar1 + "] = " + ambito + " ;");
        CodeUtil.print("Stack[(int)" + tmpPosPar2 + "] = " + TipoDato3D.atributo + " ;");
        CodeUtil.print("Stack[(int)" + tmpPosPar3 + "] = " + posCadena + " ;");
        CodeUtil.print("Stack[(int)" + tmpPosPar4 + "] = " + CodeUtil.VAL_INDEX_DEFAULT + " ;");
        CodeUtil.print("buscarObjeto();");
        let tmpPosReturn = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpPosReturn + " = Stack[SP] ;", "Se recupera el return");
        CodeUtil.printWithComment("SP = SP - " + sizeScope + " ;", "Recuperamos ambito");
        //return tmpPosReturn;
        CodeUtil.printComment("Fin de RootIdentifier :" + this.identifier);
        return tmpPosReturn;
    }
}
