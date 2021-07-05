"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodoReporteGramatica_1 = require("./NodoReporteGramatica");
class ReporteGramatica {
    constructor(produccion, regla_semantica) {
        ReporteGramatica.Lista.push(new NodoReporteGramatica_1.NodoReporteGramatica(produccion, regla_semantica));
    }
}
exports.ReporteGramatica = ReporteGramatica;
ReporteGramatica.Lista = [];
