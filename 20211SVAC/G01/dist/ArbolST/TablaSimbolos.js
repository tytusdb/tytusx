"use strict";

exports.__esModule = true;
exports.tabla_simbolos = exports.Elemento_tabla = void 0;
var Elemento_tabla = /** @class */ (function () {
    function Elemento_tabla(nombre, ambito, tipo, fila, columna) {
        this.nombre = nombre;
        this.ambito = ambito;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
    Elemento_tabla.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Elemento_tabla.prototype.setAmbito = function (ambito) {
        this.ambito = ambito;
    };
    Elemento_tabla.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    Elemento_tabla.prototype.setFila = function (fila) {
        this.fila = fila;
    };
    Elemento_tabla.prototype.setColumna = function (columna) {
        this.columna;
    };
    return Elemento_tabla;
}());
exports.Elemento_tabla = Elemento_tabla;
exports.tabla_simbolos = new Array();
