"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(tipo, id, linea, columna) {
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }
    getTipo(ent, arbol) {
        return this.tipo;
    }
    getValorImplicito(ent, arbol) {
        return this.valor;
    }
}
exports.Simbolo = Simbolo;
