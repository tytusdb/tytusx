"use strict";
exports.__esModule = true;
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(tipo, valor, linea, columna, analizador) {
        this.tipo = tipo;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.analizador = analizador;
    }
    return Error;
}());
exports.Error = Error;
