"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(linea, columna, tipo, tipo_documento, lexema) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.tipo_documento = tipo_documento;
        this.lexema = lexema;
    }
    Error.prototype.getLinea = function () {
        return this.linea;
    };
    Error.prototype.getColumna = function () {
        return this.columna;
    };
    Error.prototype.getTipo = function () {
        return this.tipo;
    };
    Error.prototype.getTipoDocumento = function () {
        return this.tipo_documento;
    };
    Error.prototype.getLexema = function () {
        return this.lexema;
    };
    return Error;
}());
exports.Error = Error;
