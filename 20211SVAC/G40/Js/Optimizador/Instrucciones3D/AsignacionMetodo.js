"use strict";

var AsignacionMetodo= /** @class */ (function () {
    function AsignacionMetodo(temporal, codigo, linea, columna, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.temporal = temporal;
    }

    AsignacionMetodo.prototype.getTemporal = function () {
        return this.temporal;
    };

    AsignacionMetodo.prototype.getLinea = function () {
        return this.linea;
    };

    AsignacionMetodo.prototype.getColumna = function () {
        return this.columna;
    };

    AsignacionMetodo.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    AsignacionMetodo.prototype.getTipo = function () {
        return this.tipo;
    };
    AsignacionMetodo.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return AsignacionMetodo;
}());

