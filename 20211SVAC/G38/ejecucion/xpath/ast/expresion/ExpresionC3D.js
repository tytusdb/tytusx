"use strict";
class ExpresionC3D {
    constructor(idResultado) {
        this.idResultado = idResultado;
        this.etiquetasVerdaderas = [];
        this.etiquetasFalsas = [];
    }
    imprimirFalsas() {
        return this.etiquetasFalsas.reduce(function (a, b) {
            return a + ":\n" + b;
        });
    }
    imprimirVerdaderas() {
        return this.etiquetasVerdaderas.reduce(function (a, b) {
            return a + ":\n" + b;
        });
    }
}
