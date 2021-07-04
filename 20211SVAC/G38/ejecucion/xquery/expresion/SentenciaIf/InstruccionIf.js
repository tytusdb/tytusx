"use strict";
class InstruccionIf extends ExpresionAncestor {
    constructor(linea, columna) {
        super();
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
    getValor(ent, xmlData) {
        try {
            this.ejecutar(ent, xmlData);
        }
        catch (e) {
            if (e instanceof ReturnException) {
                throw new ReturnException(e.valor);
            }
        }
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
}
