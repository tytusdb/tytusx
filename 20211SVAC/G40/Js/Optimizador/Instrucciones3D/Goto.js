"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Goto = void 0;
var Goto = /** @class */ (function () {
    function Goto(etiqueta, linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.etiqueta = etiqueta;
    }

    Goto.prototype.getLinea = function () {
        return this.linea;
    };

    Goto.prototype.getColumna = function () {
        return this.columna;
    };

    Goto.prototype.getEtiqueta = function () {
       return this.etiqueta;
    };

    Goto.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Goto.prototype.getTipo = function () {
        return this.tipo;
    };
    Goto.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Goto;
}());
//exports.Goto = Goto;
