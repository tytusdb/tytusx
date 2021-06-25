"use strict";
exports.__esModule = true;
var Funcion = /** @class */ (function () {
    function Funcion(prefijo, nombre, parametros, tipoRetorno, sentencias, linea, columna) {
        this.prefijo = prefijo;
        this.nombre = nombre,
            this.parametros = parametros;
        this.tipoRetorno = tipoRetorno;
        this.sentencias = sentencias;
        this.linea = linea;
        this.columna = columna;
    }
    Funcion.prototype.ejecutar = function (entorno) {
    };
    return Funcion;
}());
exports["default"] = Funcion;
