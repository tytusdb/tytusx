"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class nodoError {
    constructor(tipo, descripcion, linea, valor) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.valor = valor;
    }
    get Tipo() {
        return this.tipo;
    }
    get Descripcion() {
        return this.descripcion;
    }
    get Linea() {
        return this.linea;
    }
    get Valor() {
        return this.valor;
    }
}
exports.nodoError = nodoError;