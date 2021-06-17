"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gramatical = void 0;
class Gramatical {
    constructor() {
        this.listaReporte = [];
    }
    agregar(producccion, regla) {
        let objetoReporte = {
            produccion: producccion,
            regla: regla
        };
        this.listaReporte.push(objetoReporte);
    }
}
exports.Gramatical = Gramatical;
