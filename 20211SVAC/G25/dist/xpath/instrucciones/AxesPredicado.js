"use strict";
class AxesPredicado {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.linea = fila;
        this.columna = columna;
        console.log("AxesPredicado   " + valor);
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
