"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
class Nodo {
    constructor(nombre, hijos) {
        this.hijos = [];
        this.nombre = nombre;
        this.hijos = hijos;
    }
}
exports.Nodo = Nodo;
