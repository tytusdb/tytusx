"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Sentencia = void 0;
var Sentencia = /** @class */ (function () {
    function Sentencia(tipo, expresion, linea, columna) {
        this.linea = linea;
        this.expresion = expresion;
        this.columna = columna;
        this.tipo = tipo;
    }
    Sentencia.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    Sentencia.prototype.getValorImplicito = function (ent, arbol) {
    };
    return Sentencia;
}());
//exports.Sentencia = Sentencia;
