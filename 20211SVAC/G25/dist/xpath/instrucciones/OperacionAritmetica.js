"use strict";
class OperacionAritmetica {
    constructor(operador1, operador2, tipo, fila, columna) {
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipo;
        this.linea = fila;
        this.columna = columna;
    }
    getValorImplicito() {
        /*if (typeof(this.operador1) == "number" && typeof(this.operador2) == "number") {
            switch(this.tipoOperacion){
                case "+": { return this.operador1.getValorImplicito() + this.operador2.getValorImplicito(); }
                case "-": { return this.operador1.getValorImplicito() + this.operador2.getValorImplicito(); }
                case "*": { return this.operador1.getValorImplicito() + this.operador2.getValorImplicito(); }
                default:{ return this.operador1.getValorImplicito() / this.operador2.getValorImplicito(); }
            }
        } else {
            return ``
        } */
        return null;
    }
    generarGrafo(g, padre) {
        return null;
    }
    getNombreHijo() {
        return "";
    }
}
