"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodoCST = void 0;
class NodoCST {
    constructor() {
        if (arguments.length == 0) {
            this.etiqueta = "";
            this.valor = "";
            this.hijos = [];
            this.linea = -1;
            this.columna = -1;
        }
        else if (arguments.length == 2) {
            this.etiqueta = arguments[0];
            this.valor = arguments[1];
            this.hijos = [];
            this.linea = -1;
            this.columna = -1;
        }
        else if (arguments.length == 4) {
            this.etiqueta = arguments[0];
            this.valor = arguments[1];
            this.hijos = [];
            this.linea = arguments[2];
            this.columna = arguments[3];
        }
    }
    agregarHijo(nuevoHijo) {
        this.hijos.push(nuevoHijo);
    }
}
exports.NodoCST = NodoCST;
