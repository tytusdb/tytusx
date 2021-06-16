"use strict";
class Nodo {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.linea = fila;
        this.columna = columna;
        console.log("Nodo   " + valor);
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
