"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(id, valor, tipo, line, column) {
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.line = line;
        this.column = column;
    }
    getTipo(e) {
        return this.tipo;
    }
    getValorImplicito(e) {
        return this.valor;
    }
    generarGrafo(g, padre) {
        return null;
    }
    ;
    getNombreHijo() {
        return "";
    }
    ;
}
exports.Simbolo = Simbolo;
