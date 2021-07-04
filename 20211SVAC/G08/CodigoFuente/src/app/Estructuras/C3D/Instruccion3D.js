"use strict";
exports.__esModule = true;
exports.Etiqueta = exports.AsignacionArray = exports.Asignacion = exports.Instruccion3D = void 0;
var Instruccion3D = /** @class */ (function () {
    function Instruccion3D(tipoInstruccion, dato) {
        this.TipoInstruccion = tipoInstruccion;
        this.Dato = dato;
    }
    return Instruccion3D;
}());
exports.Instruccion3D = Instruccion3D;
var Asignacion = /** @class */ (function () {
    function Asignacion(fila, columna, id, operacion, c3d) {
        this.Fila = fila;
        this.Columna = columna;
        this.ID = id;
        this.Operacion = operacion;
        this.C3D = c3d;
    }
    return Asignacion;
}());
exports.Asignacion = Asignacion;
var AsignacionArray = /** @class */ (function () {
    function AsignacionArray(fila, columna, id, simbolo, c3d) {
        this.Fila = fila;
        this.Columna = columna;
        this.ID = id;
        this.Simbolo = simbolo;
        this.C3D = c3d;
    }
    return AsignacionArray;
}());
exports.AsignacionArray = AsignacionArray;
var Etiqueta = /** @class */ (function () {
    function Etiqueta(fila, columna, id, c3d) {
        this.Fila = fila;
        this.Columna = columna;
        this.ID = id;
        this.C3D = c3d;
    }
    return Etiqueta;
}());
exports.Etiqueta = Etiqueta;
