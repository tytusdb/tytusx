"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodoError = void 0;
var NodoError = /** @class */ (function () {
    function NodoError(tipo, descripcion, fila) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
    }
    NodoError.prototype.gettipo = function () {
        return this.tipo;
    };
    NodoError.prototype.getdescripcion = function () {
        return this.descripcion;
    };
    NodoError.prototype.getfila = function () {
        return this.fila;
    };
    return NodoError;
}());
exports.NodoError = NodoError;
