"use strict";
class NodoComplemento extends Codigo3d {
    constructor(salida, linea, columna) {
        super(linea, columna);
        this.salida = salida;
    }
    toString() {
        return this.salida + "\n";
    }
}
