"use strict";
class Gramatica {
    constructor(produccion, regla) {
        this.produccion = produccion;
        this.regla = regla;
    }
    getProduccion() {
        return this.produccion;
    }
    getRegla() {
        return this.regla;
    }
}
