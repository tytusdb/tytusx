"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mierror = /** @class */ (function () {
    function mierror(tipoError, descripcion, linea, columna) {
        this.tipoError = tipoError;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    mierror.prototype.getTipo = function () {
        return this.tipoError;
    };
    mierror.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    mierror.prototype.getLinea = function () {
        return this.linea;
    };
    mierror.prototype.getColumna = function () {
        return this.columna;
    };
    mierror.prototype.getMensaje = function () {
        return ('Error ' + this.tipoError + ': ' +
            this.descripcion +
            ' en la linea ' + this.linea +
            ' y columna ' + this.columna);
    };
    return mierror;
}());
exports.default = mierror;
