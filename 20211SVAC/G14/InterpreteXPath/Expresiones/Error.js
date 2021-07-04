"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(linea, columna, mensaje, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.mensaje = mensaje;
        this.tipo = tipo;
    }
    Error.prototype.ToString = function () {
        return "";
    };
    return Error;
}());
exports.Error = Error;
