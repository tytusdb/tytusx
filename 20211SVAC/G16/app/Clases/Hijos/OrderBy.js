"use strict";
exports.__esModule = true;
exports.OrderBy = void 0;
var OrderBy = /** @class */ (function () {
    function OrderBy(pivote, linea, columna) {
        this.pivote = pivote;
        this.linea = linea;
        this.columna = columna;
    }
    OrderBy.prototype.ejecutar = function (entorno, node) {
        console.log("pasó por el order by");
        console.log(entorno);
    };
    return OrderBy;
}());
exports.OrderBy = OrderBy;
