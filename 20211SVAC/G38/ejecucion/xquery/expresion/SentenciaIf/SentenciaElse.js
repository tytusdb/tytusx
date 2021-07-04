"use strict";
class SentenciaElse {
    constructor(sentencias, linea, columna) {
        this.sentencias = sentencias;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let entornoElse = new TablaSimbolosXquery(ent, "entorno else");
        for (let sentencia of this.sentencias) {
            sentencia.ejecutar(entornoElse, xmlData);
        }
    }
}
