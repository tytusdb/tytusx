"use strict";
class Wildcard {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.linea = fila;
        this.columna = columna;
        console.log("wildcard   " + valor);
    }
    getValorImplicito() {
        return null;
    }
    generarGrafo(g, padre) {
        return this.valor;
    }
    getNombreHijo() {
        return "";
    }
}
