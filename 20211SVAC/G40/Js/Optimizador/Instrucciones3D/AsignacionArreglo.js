"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.AsignacionArreglo = void 0;
var AsignacionArreglo = /** @class */ (function () {
    function AsignacionArreglo(temporal, codigo, linea, columna, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.temporal = temporal;
    }
    AsignacionArreglo.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    AsignacionArreglo.prototype.getTipo = function () {
        return this.tipo;
    };
    AsignacionArreglo.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return AsignacionArreglo;
}());
//exports.AsignacionArreglo = AsignacionArreglo;
