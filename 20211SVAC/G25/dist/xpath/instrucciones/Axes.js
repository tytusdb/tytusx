"use strict";
class Axes {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.linea = fila;
        this.columna = columna;
        console.log("Axes   " + valor);
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
