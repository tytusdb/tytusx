"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(Tipo, Descripcion, fila, columna) {
        this.Tipo = Tipo;
        this.Descripcion = Descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    return Error;
}());
exports.Error = Error;
