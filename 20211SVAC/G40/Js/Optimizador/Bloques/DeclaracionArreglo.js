"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.DeclaracionArreglo = void 0;
var DeclaracionArreglo = /** @class */ (function () {
    function DeclaracionArreglo(linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.instrucciones = [];
    }
    DeclaracionArreglo.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    DeclaracionArreglo.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    DeclaracionArreglo.prototype.getTipo = function () {
        return this.tipo;
    };
    DeclaracionArreglo.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return DeclaracionArreglo;
}());
//exports.DeclaracionArreglo = DeclaracionArreglo;
