"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arreglo = void 0;
const instruccion_1 = require("../interfaces/instruccion");
const ejeArreglo_1 = require("./ejeArreglo");
class Arreglo extends instruccion_1.Instruccion {
    constructor(linea, valores_arreglo = null) {
        super(linea);
        this.valores_arreglo = valores_arreglo;
    }
    ejecutar(e) {
        const arreglo = [];
        let inicio = this.valores_arreglo[0].ejecutar(e);
        let final = this.valores_arreglo[1].ejecutar(e);
        //console.log(inicio, final);
        for (let index = inicio; index < final + 1; index++) {
            arreglo.push(index);
        }
        return new ejeArreglo_1.Arreglo(arreglo);
    }
}
exports.Arreglo = Arreglo;
