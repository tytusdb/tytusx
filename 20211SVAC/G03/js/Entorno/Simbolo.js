"use strict";
class Simbolo {
    constructor(tipo, id, linea, columna) {
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    getValorImplicito() {
        return this.valor;
    }
}
