"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Return = void 0;
var Return = /** @class */ (function () {
    function Return(metodo, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.metodo = metodo;
    }
    Return.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Return.prototype.getTipo = function () {
        return this.tipo;
    };
    Return.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Return;
}());
//exports.Return = Return;
