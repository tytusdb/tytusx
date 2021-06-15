"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = exports.Tipo = void 0;
var Tipo;
(function (Tipo) {
    Tipo[Tipo["ACCESO"] = 0] = "ACCESO";
    Tipo[Tipo["ATRIBUTO"] = 1] = "ATRIBUTO";
    Tipo[Tipo["TEST"] = 2] = "TEST";
    Tipo[Tipo["SIGNO"] = 3] = "SIGNO";
})(Tipo = exports.Tipo || (exports.Tipo = {}));
class Acceso {
    constructor(valor, tipo, linea, columna) {
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Acceso = Acceso;
