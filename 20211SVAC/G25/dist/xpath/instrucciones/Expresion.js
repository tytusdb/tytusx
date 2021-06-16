"use strict";
class Expresion {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.linea = fila;
        this.columna = columna;
    }
    getValorImplicito() {
        return this.valor;
    }
    generarGrafo(g, padre) {
        return null;
    }
    getNombreHijo() {
        return "";
    }
}
