"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.ExpresionDefinida = void 0;
var ExpresionDefinida = /** @class */ (function () {
    function ExpresionDefinida(linea, columna, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }
    ExpresionDefinida.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    ExpresionDefinida.prototype.getValorImplicito = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    return ExpresionDefinida;
}());
//exports.ExpresionDefinida = ExpresionDefinida;
