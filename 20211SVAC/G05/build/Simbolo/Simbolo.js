"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(tipo, id, linea, columna, value, ent) {
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = value;
        this.entorno = ent;
    }
    ToString() {
        return String(this.valor);
    }
}
exports.Simbolo = Simbolo;
