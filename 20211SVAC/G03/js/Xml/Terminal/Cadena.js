"use strict";
class Cadena extends Expresion {
    constructor(fila, columna, valor) {
        super(fila, columna, "Cadena", valor);
        this.getTipo().setType(Tipo_Enum.STRING);
        this.setValueExp(valor);
    }
    ejecutar(entorno) {
    }
}
