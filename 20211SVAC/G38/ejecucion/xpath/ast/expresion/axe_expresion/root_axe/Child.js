"use strict";
class Child extends ExpresionAncestor {
    constructor(axeType, axeOperation, identifier, listaPredicados, linea, columna) {
        super();
        this.axeType = axeType;
        this.axeOperation = axeOperation;
        this.identifier = identifier;
        this.listaPredicados = listaPredicados;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        return new Tipo(TipoDato.err);
    }
    getValor(tsXquery, ent) {
        let ts = new TablaSimbolos(null);
        switch (this.axeOperation) {
            case AxeOperation.identifier:
                ts = ent.findObjectsByNombreElemento(this.identifier);
                break;
            case AxeOperation.node:
                ts = ent.findAllObjects();
                break;
            case AxeOperation.times:
                ts = ent.findAllObjects();
                break;
            case AxeOperation.text:
                ts = ent.findAllObjectsOrAtributesWithText();
                break;
        }
        return PredicateExpresion.filterXpathExpresion(ts, this.listaPredicados);
    }
    traducir3D(ambito, sizeScope) {
        let tmpresultado;
        let ts = new TablaSimbolos(null);
        switch (this.axeOperation) {
            case AxeOperation.identifier:
                tmpresultado = this.traducir3DByIdentifier(ambito, sizeScope);
                break;
            case AxeOperation.node:
                break;
            case AxeOperation.times:
                break;
            case AxeOperation.text:
                break;
        }
        return tmpresultado;
    }
    traducir3DByIdentifier(ambito, sizeScope) {
        CodeUtil.printComment("Traduccion de RootIdentifier :" + this.identifier);
        let posCadena = CodeUtil.guardarTexto(this.identifier);
        CodeUtil.printComment("Generamos predicados");
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
        CodeUtil.print("Stack[(int)" + tmpPosPar2 + "] = " + TipoDato3D.objeto + " ;");
        CodeUtil.print("Stack[(int)" + tmpPosPar3 + "] = " + posCadena + " ;");
        CodeUtil.print("Stack[(int)" + tmpPosPar4 + "] = -1 ;");
        CodeUtil.print("buscarByPadreTipoValorIndex();");
        let tmpPosReturn = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmpPosReturn + " = Stack[SP] ;", "Se recupera el return");
        CodeUtil.printWithComment("SP = SP - " + sizeScope + " ;", "Recuperamos ambito");
        //return tmpPosReturn;
        CodeUtil.printComment("Fin de RootIdentifier :" + this.identifier);
        return tmpPosReturn;
    }
}
