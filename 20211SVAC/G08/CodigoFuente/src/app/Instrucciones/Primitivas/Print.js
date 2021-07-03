"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
class Print {
    constructor(exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        if (valor !== null) {
            console.log('>', valor);
        }
        else {
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }
}
exports.Print = Print;
