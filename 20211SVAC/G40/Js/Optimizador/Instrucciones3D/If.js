"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.If = void 0;
var If = /** @class */ (function () {
    function If(op1, op2, operador, goto, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.operando1 = op1;
        this.operando2 = op2;
        this.operador = operador;
        this.goto = goto;
    }
    If.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    If.prototype.getTipo = function () {
        return this.tipo;
    };

    If.prototype.setOperando1 = function (op1) {
        this.operando1 = op1;
    };
    If.prototype.getOperando1 = function () {
        return this.operando1;
    };

    If.prototype.setOperando2 = function (op2) {
        this.operando1 = op2;
    };
    If.prototype.getOperando2 = function () {
        return this.operando2;
    };

    If.prototype.setGOTO = function (goto) {
        this.goto = goto;
    };
    If.prototype.getGOTO = function () {
        return this.goto;
    };

    If.prototype.setOperador = function (op) {
        this.operador = op;
    };
    If.prototype.getOperador = function () {
        return this.operador;
    };

    If.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return If;
}());
//exports.If = If;
