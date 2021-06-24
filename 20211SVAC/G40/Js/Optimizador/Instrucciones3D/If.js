"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.If = void 0;
var If = /** @class */ (function () {
    function If(temporal, op1, op2, operador, goto, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.operando1 = op1;
        this.operando2 = op2;
        this.operador = operador;
        this.temporal = temporal;
        this.goto = goto;
    }
    If.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    If.prototype.getTipo = function () {
        return this.tipo;
    };
    If.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return If;
}());
//exports.If = If;
