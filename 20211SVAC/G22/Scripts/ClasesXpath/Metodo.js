"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metodo = void 0;
var Metodo = /** @class */ (function () {
    function Metodo(tipo, siguienteAlMetodo, linea, columna) {
        this.tipo = tipo;
        this.siguienteAlMetodo = siguienteAlMetodo;
        this.linea = linea;
        this.columna = columna;
    }
    Metodo.prototype.getTipo = function (arbol) {
        return this.tipo;
    };
    Metodo.prototype.getValorImplicito = function (arbol) {
        return this.siguienteAlMetodo;
    };
    return Metodo;
}());
exports.Metodo = Metodo;
