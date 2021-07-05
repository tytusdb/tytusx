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
    traducir3DXQuery(sizeScope) {
        let etiquetaIf = CodeUtil.generarEtiqueta();
        CodeUtil.printComment("Inicio de instrucciones if");
        for (let sentIf of this.sentenciasIfs) {
            let expresionC3D = sentIf.traducir3DXQuery(sizeScope);
            if (expresionC3D != null && expresionC3D instanceof ExpresionC3D) {
                CodeUtil.printWithComment("goto " + etiquetaIf + ";", "Salto salida del if");
                CodeUtil.print(expresionC3D.imprimirFalsas() + ":");
            }
            else {
                throw CrearError.errorSemantico("Error en condicion para sentencias if", this.linea, this.columna);
            }
        }
        if (this.sentenciaElse != null) {
            this.sentenciaElse.traducir3DXQuery(sizeScope);
        }
        CodeUtil.printWithComment(etiquetaIf + ":", "Salto salida del if");
        CodeUtil.printComment("Fin instrucciones if");
    }
    traducirXQ(sizeScope, otro) {
        this.traducir3DXQuery(sizeScope);
    }
}
