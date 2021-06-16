"use strict";
class Identificador extends Expresion {
    constructor(fila, columna, valor) {
        super(fila, columna, "Identificador", valor);
    }
    ejecutar(entorno) {
    }
}
