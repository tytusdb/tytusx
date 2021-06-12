"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetoNodo = void 0;
var ObjetoNodo = /** @class */ (function () {
    function ObjetoNodo(id, texto, listaAtributos, listaObjetos, linea, columna) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this, this.listaObjetos = listaObjetos;
    }
    return ObjetoNodo;
}());
exports.ObjetoNodo = ObjetoNodo;
