"use strict";
exports.__esModule = true;
exports.PR = void 0;
var PR = /** @class */ (function () {
    function PR(val, li, col) {
        this.valor = val;
        this.linea = li;
        this.columna = col;
    }
    PR.prototype.getTipo = function (ent, arbol) {
        return TipoXpath.CADENA;
    };
    PR.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    return PR;
}());
exports.PR = PR;
