"use strict";
class ListaXpathExpresion extends ExpresionAncestor {
    constructor(expresionesXpath, linea, columna) {
        super();
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
    traducir3D(ambito, sizeScope) {
        CodeUtil.printComment("Obtenemos la lista de la carga xml");
        let tmpPosLista = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosLista + " = SP + 1 ;");
        let tmpLista = CodeUtil.generarTemporal();
        CodeUtil.print(tmpLista + " = Stack[(int)" + tmpPosLista + "];");
        //CodeUtil.guardarTemporales(tmpPosLista,tmpLista);
        let nuevaLista = "";
        this.expresionesXpath.forEach(function (expression) {
            nuevaLista = expression.traducir3D(tmpLista, sizeScope);
        });
        //CodeUtil.recuperarTemporales(tmpPosLista,tmpLista);
        //Imprimimos la lista
        CodeUtil.printComment("Imprimimos lista resultante");
        CodeUtil.print("SP = SP + " + sizeScope + " ; ");
        //CodeUtil.guardarTemporales(tmpPosLista,tmpLista);
        CodeUtil.printWithComment("Stack[SP] = " + nuevaLista + "; ", "Imprimimos la lista");
        CodeUtil.print("imprimirListaObjetos();");
        //CodeUtil.recuperarTemporales(tmpPosLista,tmpLista);
        CodeUtil.print("SP = SP + " + sizeScope + " ; ");
        return "";
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
