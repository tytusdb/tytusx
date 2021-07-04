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
}
