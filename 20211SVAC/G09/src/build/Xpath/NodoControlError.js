"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodoControlError {
    constructor(simbolo, tipo, linea, columna, entorno) {
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
        this.entorno = entorno;
        //   this.Agregar(this.simbolo,this.tipo,this.linea,this.columna,this.entorno)
    }
}
exports.NodoControlError = NodoControlError;
