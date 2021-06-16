"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predicate = void 0;
var Predicate = /** @class */ (function () {
    function Predicate(expresion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    Predicate.prototype.getTipo = function (entorno) {
        return this.tipo;
    };
    Predicate.prototype.getValor = function (ent) {
        var resultado = this.expresion.getValor(ent);
        this.tipo = this.expresion.getTipo(ent);
        return resultado;
    };
    return Predicate;
}());
exports.Predicate = Predicate;
