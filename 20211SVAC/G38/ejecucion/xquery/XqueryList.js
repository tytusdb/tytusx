"use strict";
class XqueryList {
    constructor(xqueryInstruccions) {
        this.xqueryInstruccions = xqueryInstruccions;
    }
    ejecutar(ent, xmlData) {
        let salidas = [];
        this.xqueryInstruccions.forEach(function (instruccion) {
            if (instruccion instanceof Imprimir) {
                let salida = instruccion.ejecutar(ent, xmlData);
                if (salida != null && salida != undefined)
                    salidas.push(salida);
            }
            else {
                instruccion.ejecutar(ent, xmlData);
            }
        });
        return salidas;
    }
}
