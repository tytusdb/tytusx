"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Etiqueta = void 0;
var Etiqueta = /** @class */ (function () {
    function Etiqueta(temporal, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.temporal = temporal;
    }
    Etiqueta.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Etiqueta.prototype.getTipo = function () {
        return this.tipo;
    };
    Etiqueta.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Etiqueta;
}());
//exports.Etiqueta = Etiqueta;
