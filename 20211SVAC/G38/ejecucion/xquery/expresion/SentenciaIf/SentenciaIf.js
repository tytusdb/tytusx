"use strict";
class SentenciaIf {
    constructor(condicion, sentencia, linea, columna) {
        this.condicion = condicion;
        this.sentencias = sentencia;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let tipo = this.condicion.getTipo(ent, xmlData);
        if (tipo != null && tipo != undefined && tipo.esBoolean()) {
            let valor = this.condicion.getValor(ent, xmlData);
            if (valor) {
                let entornoIf = new TablaSimbolosXquery(ent, "entorno if");
                let valor = this.sentencias.getValor(entornoIf, xmlData);
                if (valor != null && valor != undefined) {
                    throw new ReturnException(valor);
                }
                return true;
            }
        }
        return false;
    }
    traducir3DXQuery(sizeScope) {
        CodeUtil.printComment("Sentencia if");
        let condicionC3D = this.condicion.traducir3DXQuery(sizeScope);
        if (condicionC3D != null && condicionC3D instanceof ExpresionC3D) {
            CodeUtil.printWithComment(condicionC3D.imprimirVerdaderas() + ":", "Etiqueta verdadera if");
            let exp = this.sentencias.traducir3DXQuery(sizeScope);
            let tmpObjeto = CodeUtil.guardarPrimitivoEnHeap(exp.idResultado, this.sentencias.getTipo(null, null));
            let tmpLista = CodeUtil.guardarRerenciaEnLista(tmpObjeto, sizeScope);
            ExpresionAncestor.imprimirLista3D(sizeScope, tmpLista);
        }
        else {
            return null;
        }
        CodeUtil.printComment("Fin sentencia if");
        return condicionC3D;
    }
    traducirXQ(sizeScope, otro) {
        throw new Error("Method not implemented.");
    }
}
