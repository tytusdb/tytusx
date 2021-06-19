"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = exports.Tipo2 = void 0;
var Tipo2;
(function (Tipo2) {
    Tipo2[Tipo2["ACCESO"] = 0] = "ACCESO";
    Tipo2[Tipo2["ATRIBUTO"] = 1] = "ATRIBUTO";
    Tipo2[Tipo2["TEST"] = 2] = "TEST";
    Tipo2[Tipo2["SIGNO"] = 3] = "SIGNO";
})(Tipo2 = exports.Tipo2 || (exports.Tipo2 = {}));
class Acceso {
    constructor(tiposlash, valor, tipo, linea, columna) {
        this.tiposlash = tiposlash;
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Acceso = Acceso;
