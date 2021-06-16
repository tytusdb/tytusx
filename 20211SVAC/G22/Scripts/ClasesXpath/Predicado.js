"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predicado = void 0;
var TiposXpath_1 = require("./TiposXpath");
var Predicado = /** @class */ (function () {
    function Predicado(valorPredicado, linea, columna) {
        this.tipo = TiposXpath_1.TiposXpath.PREDICADO;
        this.valorPredicado = valorPredicado;
        this.linea = linea;
        this.columna = columna;
    }
    Predicado.prototype.getTipo = function (arbol) {
        return this.tipo;
    };
    Predicado.prototype.getValorImplicito = function (arbol) {
        return this.valorPredicado;
    };
    return Predicado;
}());
exports.Predicado = Predicado;
