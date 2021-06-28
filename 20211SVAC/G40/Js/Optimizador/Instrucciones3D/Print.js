"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Print = void 0;
var Print = /** @class */ (function () {
    function Print(linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
    }
    Print.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Print.prototype.getTipo = function () {
        return this.tipo;
    };
    Print.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Print;
}());
//exports.Print = Print;
