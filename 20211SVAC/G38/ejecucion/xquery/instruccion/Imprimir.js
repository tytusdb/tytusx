"use strict";
class Imprimir {
    constructor(expresion, columna, linea) {
        this.expresion = expresion;
        this.columna = columna;
        this.linea = linea;
    }
    ejecutar(ent, xmlData) {
        let valor = this.expresion.getValor(ent, xmlData);
        InterfazGrafica.print(valor);
        return valor;
    }
}
