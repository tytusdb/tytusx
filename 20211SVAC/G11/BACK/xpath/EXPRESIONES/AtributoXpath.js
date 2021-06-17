"use strict";

exports.__esModule = true;
exports.AtributoXpath = void 0;

var AtributoXpath = /** @class */ (function () {
    function AtributoXpath(bar, pu, li, col) {
        this.barras = bar;
        this.puntos = pu;
        this.linea = li;
        this.columna = col;
    }
    AtributoXpath.prototype.getTipo = function (ent, arbol) {
        return TipoXpath.CADENA;
    };
    AtributoXpath.prototype.getValorImplicito = function (ent, arbol) {
        return this.barras + this.puntos;
    };
    return AtributoXpath;
}());
exports.AtributoXpath = AtributoXpath;
