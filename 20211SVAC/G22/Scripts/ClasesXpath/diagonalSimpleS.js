"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagonalSimpleS = void 0;
var TiposXpath_1 = require("./TiposXpath");
var diagonalSimpleS = /** @class */ (function () {
    function diagonalSimpleS(valorCompaniaDiagonal, linea, columna) {
        this.tipo = TiposXpath_1.TiposXpath.DIAGONAL_SIMPLE;
        this.valorSiguienteDiagonalS = valorCompaniaDiagonal;
        this.linea = linea;
        this.columna = columna;
    }
    diagonalSimpleS.prototype.getTipo = function (arbol) {
        return this.tipo;
    };
    diagonalSimpleS.prototype.getValorImplicito = function (arbol) {
        return this.valorSiguienteDiagonalS;
    };
    return diagonalSimpleS;
}());
exports.diagonalSimpleS = diagonalSimpleS;
