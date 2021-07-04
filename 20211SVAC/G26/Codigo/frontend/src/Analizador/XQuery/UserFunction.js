"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFunction = void 0;
class UserFunction {
    constructor(tipo, nombre, parametros, instrucciones, linea, columna) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(entornoXQuery, entornoXML) {
        throw new Error('Method not implemented.');
    }
}
exports.UserFunction = UserFunction;
