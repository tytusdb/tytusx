"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Llamada = void 0;
var Llamada = /** @class */ (function () {
    function Llamada(metodo, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.metodo = metodo;
    }
    Llamada.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Llamada.prototype.getTipo = function () {
        return this.tipo;
    };
    Llamada.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Llamada;
}());
//exports.Llamada = LLamada;
