"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTE = exports.ELexico = exports.ESintactico = exports.TError = exports.errorLex = exports.errorSin = exports.errorSem = void 0;
exports.errorSem = [];
exports.errorSin = [];
exports.errorLex = [];
function Error(tipo, desc, analizador, linea, col) {
    return {
        tipo: tipo,
        descripcion: desc,
        analizador: analizador,
        linea: linea,
        columna: col
    };
}
class TError {
    constructor() {
        this.tablaErrores = [];
        this.semantico = [];
        this.lexic = [];
    }
    agregar(tipo, desc, analizador, linea, col) {
        const result = Error(tipo, desc, analizador, linea, col);
        this.tablaErrores.push(result);
        exports.errorSem.push(result);
    }
    imprimir() {
        let todosErrores = "";
        this.tablaErrores.forEach(element => {
            todosErrores += "[error][ linea: " + element.linea + " columna: " + element.columna + " ] " + element.descripcion + "\n";
        });
        return todosErrores;
    }
    get() {
        return this.tablaErrores;
    }
}
exports.TError = TError;
class ESintactico {
    constructor(tipo, descripcion, analizador, linea, columna) {
        const result = Error(tipo, descripcion, analizador, linea, columna);
        exports.errorSin.push(result);
    }
}
exports.ESintactico = ESintactico;
class ELexico {
    constructor(tipo, descripcion, analizador, linea, columna) {
        const result = Error(tipo, descripcion, analizador, linea, columna);
        exports.errorLex.push(result);
    }
}
exports.ELexico = ELexico;
function resetTE() {
    exports.errorSem = [];
    exports.errorSin = [];
    exports.errorLex = [];
}
exports.resetTE = resetTE;
