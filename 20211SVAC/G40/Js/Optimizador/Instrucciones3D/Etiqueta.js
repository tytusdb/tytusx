"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Etiqueta = void 0;
var Etiqueta = /** @class */ (function () {
    function Etiqueta(etiqueta, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.etiqueta = etiqueta;
    }

    Etiqueta.prototype.getLinea = function () {
        return this.linea;
    };

    Etiqueta.prototype.getColumna = function () {
        return this.columna;
    };

    Etiqueta.prototype.getEtiqueta = function () {
        return this.etiqueta;
     };

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
