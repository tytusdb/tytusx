"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodoBusqueda {
    constructor(tipo, selector, nodoId, predicado, next, linea, columna) {
        this.tipo = tipo;
        this.selector = selector;
        this.nodoId = nodoId;
        this.predicado = predicado;
        this.next = next;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.NodoBusqueda = NodoBusqueda;
