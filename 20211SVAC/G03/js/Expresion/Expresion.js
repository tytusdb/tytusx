"use strict";
class Expresion extends Nodo {
    constructor(fila, columna, nombre, valor) {
        super(fila, columna, nombre, valor);
        this.tipoExp = new Tipo();
    }
    ejecutar(entorno) {
    }
    getTipo() {
        return this.tipoExp;
    }
    setTipo(tipoExp) {
        this.tipoExp = tipoExp;
    }
    getValueExp() {
        return this.valueExp;
    }
    setValueExp(valueExp) {
        this.valueExp = valueExp;
    }
}
