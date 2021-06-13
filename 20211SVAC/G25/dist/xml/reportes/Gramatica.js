"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gramatica = void 0;
class Gramatica {
    constructor(produccion, regla) {
        this.produccion = produccion;
        this.regla = regla;
    }
    getProduccion() {
        return this.produccion;
    }
    getRegla() {
        return this.regla;
    }
}
exports.Gramatica = Gramatica;
