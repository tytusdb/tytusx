"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.NodoXpath = void 0;
var NodoXpath = /** @class */ (function () {
    function NodoXpath(id, tipo, axes, listaSelectores, expresion, linea, columna) {
        this.listaSelectores = listaSelectores;
        this.linea = linea;
        this.columna = columna;
        this.expresionXpath = expresion;
        this.axes = axes;
        this.tipo = tipo;
    }
    NodoXpath.prototype.agregarSelect = function (selector) {
        this.listaSelectores.push(selector);
    };
    NodoXpath.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    NodoXpath.prototype.getValorImplicito = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    return NodoXpath;
}());
//exports.NodoXpath = NodoXpath;