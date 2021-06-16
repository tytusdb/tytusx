"use strict";
exports.__esModule = true;
exports.NodoError = void 0;
var NodoError = /** @class */ (function () {
    function NodoError(Token, Error, Fila, Columna) {
        this.Token = Token;
        this.Error = Error;
        this.Fila = Fila;
        this.Columna = Columna;
    }
    NodoError.prototype.getToken = function () {
        return this.Token;
    };
    NodoError.prototype.getdescripcion = function () {
        return this.Error;
    };
    NodoError.prototype.getFila = function () {
        return this.Fila;
    };
    NodoError.prototype.getColumna = function () {
        return this.Columna;
    };
    return NodoError;
}());
exports.NodoError = NodoError;
