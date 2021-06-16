"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagonalDobleC = void 0;
var TiposXpath_1 = require("./TiposXpath");
var diagonalDobleC = /** @class */ (function () {
    function diagonalDobleC(valorCompaniaDiagonalDoble, linea, columna) {
        this.tipo = TiposXpath_1.TiposXpath.DIAGONAL_DOBLE;
        this.valorSiguienteDiagonalD = valorCompaniaDiagonalDoble;
        this.linea = linea;
        this.columna = columna;
    }
    diagonalDobleC.prototype.getTipo = function (arbol) {
        return this.tipo;
    };
    diagonalDobleC.prototype.getValorImplicito = function (arbol) {
        return this.valorSiguienteDiagonalD;
    };
    return diagonalDobleC;
}());
exports.diagonalDobleC = diagonalDobleC;
