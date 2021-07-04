"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
class Atributo {
    constructor(nombre, valor) {
        this.nombre = nombre;
        this.valor = valor;
    }
    dameNombre() {
        return this.nombre;
    }
    dameValor() {
        return this.valor;
    }
    recorrer(e, nivel) {
        let espacio = " - ".repeat(nivel);
        let salida = espacio + `ATRIBUTO: ${this.nombre} - Valor: ${this.valor} - Etiqueta: ${e}` + '\n';
        return salida;
    }
}
exports.Atributo = Atributo;
