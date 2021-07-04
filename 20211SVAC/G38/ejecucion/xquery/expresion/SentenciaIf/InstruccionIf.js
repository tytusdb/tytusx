"use strict";
class InstruccionIf {
    constructor(linea, columna) {
        this.sentenciasIfs = [];
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        for (let sentenciaIf of this.sentenciasIfs) {
            if (sentenciaIf.ejecutar(ent, xmlData))
                return;
        }
        if (this.sentenciaElse != null && this.sentenciaElse != undefined)
            this.sentenciaElse.ejecutar(ent, xmlData);
    }
    agregarElse(sentenciaElse) {
        this.sentenciaElse = sentenciaElse;
    }
    agregarElseIf(sentenciaIf) {
        this.sentenciasIfs.push(sentenciaIf);
    }
    agregarPrimerIf(sentenciaIf) {
        this.sentenciasIfs.unshift(sentenciaIf);
    }
    traducirXQ(sizeScope, otro) {
        throw new Error("Method not implemented.");
    }
}
