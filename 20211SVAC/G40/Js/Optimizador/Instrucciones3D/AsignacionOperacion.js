"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.AsignacionOperacion = void 0;
var AsignacionOperacion = /** @class */ (function () {
    function AsignacionOperacion(temporal, op1, op2, operador, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.operando1 = op1;
        this.operando2 = op2;
        this.operador = operador;
        this.temporal = temporal;
    }
    AsignacionOperacion.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    AsignacionOperacion.prototype.getTipo = function () {
        return this.tipo;
    };
    AsignacionOperacion.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return AsignacionOperacion;
}());
//exports.AsignacionOperacion = AsignacionOperacion;
