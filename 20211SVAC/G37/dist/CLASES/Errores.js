"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
exports.Errores = void 0;
class Errores {
    constructor(texto, tipoError, linea, columna) {
        this.texto = texto;
        this.tipoError = tipoError;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Errores = Errores;
