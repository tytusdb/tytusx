"use strict";
exports.__esModule = true;
exports.Where = void 0;
var Where = /** @class */ (function () {
    function Where(Condicion, linea, columna) {
        this.Condicion = Condicion;
        this.linea = linea;
        this.columna = columna;
    }
    Where.prototype.ejecutar = function (entorno, node) {
        console.log("pasó por el where");
    };
    return Where;
}());
exports.Where = Where;
