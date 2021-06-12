"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Axes = void 0;
var Axes = /** @class */ (function () {
    function Axes(linea, columna, tipo, expresion) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = tipo;
    }
    Axes.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    Axes.prototype.getValorImplicito = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    return Axes;
}());
//exports.Axes = Axes;