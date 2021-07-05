"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = void 0;
class Variable {
    constructor(tipo, codigo3D, fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigo3Dir = codigo3D;
    }
    getCodigo3Dir() {
        return this.codigo3Dir;
    }
    setCodigo3Dir(codigo) {
        this.codigo3Dir = codigo;
    }
    optimizar() {
    }
}
exports.Variable = Variable;
