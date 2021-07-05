"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Html = void 0;
class Html {
    constructor(identifier, atributos, texto, listaHtml, listaVarCall, isUnica, linea, columna) {
        this.linea = linea;
        this.listaVarCall = listaVarCall;
        this.columna = columna;
        this.isUnica = isUnica;
        this.identifier = identifier;
        this.listaHtml = listaHtml;
        this.atributos = atributos;
        this.texto = texto;
    }
    ejecutar(ent) {
    }
}
exports.Html = Html;
