"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.AsignacionSimple = void 0;
var AsignacionSimple = /** @class */ (function () {
    function AsignacionSimple(temporal, valor, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.valor = valor;
        this.temporal = temporal;
    }
    AsignacionSimple.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    AsignacionSimple.prototype.getTipo = function () {
        return this.tipo;
    };
    AsignacionSimple.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return AsignacionSimple;
}());
//exports.AsignacionSimple = AsignacionSimple;
