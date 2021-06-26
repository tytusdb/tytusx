"use strict";
class SentenciaElse {
    constructor(sentencias, linea, columna) {
        this.sentencias = sentencias;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        for (let sentencia of this.sentencias) {
            sentencia.ejecutar(ent, xmlData);
        }
    }
}
