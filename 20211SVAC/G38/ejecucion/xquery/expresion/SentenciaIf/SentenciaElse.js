"use strict";
class SentenciaElse {
    constructor(sentencia, linea, columna) {
        this.sentencia = sentencia;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let entornoElse = new TablaSimbolosXquery(ent, "entorno else");
        let valor = this.sentencia.getValor(entornoElse, xmlData);
        if (valor != null && valor != undefined) {
            throw new ReturnException(valor);
        }
    }
    traducir3DXQuery(sizeScope) {
        CodeUtil.printComment("Sentencia else");
        let exp = this.sentencia.traducir3DXQuery(sizeScope);
        let tmpObjeto = CodeUtil.guardarPrimitivoEnHeap(exp.idResultado, this.sentencia.getTipo(null, null));
        let tmpLista = CodeUtil.guardarRerenciaEnLista(tmpObjeto, sizeScope);
        ExpresionAncestor.imprimirLista3D(sizeScope, tmpLista);
        CodeUtil.printComment("Fin sentencia else");
    }
    traducirXQ(sizeScope, otro) {
        throw new Error("Method not implemented.");
    }
}
