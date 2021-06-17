"use strict";
class Simbolo {
    constructor(nombre, tipo, valor, linea, columna, padre) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.nombre = nombre;
        this.padre = padre;
    }
    getTipo() {
        return this.tipo;
    }
    getValor() {
        return this.valor;
    }
    getPadre() {
        return this.padre;
    }
    getNombre() {
        return this.nombre;
    }
}
