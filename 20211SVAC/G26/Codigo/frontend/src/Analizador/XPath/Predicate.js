"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predicate = void 0;
class Predicate {
    constructor(expresion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo() {
        return this.tipo;
    }
    getValor(ent) {
        let resultado = this.expresion.getValor(ent);
        this.tipo = this.expresion.getTipo(ent);
        return resultado;
    }
    getValorInicial(ent) {
    }
}
exports.Predicate = Predicate;
