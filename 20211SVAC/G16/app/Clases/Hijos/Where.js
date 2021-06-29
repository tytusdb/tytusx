"use strict";
exports.__esModule = true;
exports.Where = void 0;
var Where = /** @class */ (function () {
    function Where(Condicion, linea, columna) {
        this.Condicion = Condicion;
        this.linea = linea;
        this.columna = columna;
    }
    Where.prototype.ejecutar = function (entorno) {
        throw new Error('Method not implemented.');
    };
    return Where;
}());
exports.Where = Where;
