"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
class Nodo {
    constructor(id, valor, padre, hijos) {
        this.id = id;
        this.valor = valor;
        this.padre = padre;
        this.hijos = hijos;
        this.hijos.forEach((hijo) => {
            hijo.setPadre(this);
        });
    }
    agregarHijo(hijo) {
        this.hijos.push(hijo);
    }
    setPadre(padre) {
        this.padre = padre;
    }
}
exports.Nodo = Nodo;
