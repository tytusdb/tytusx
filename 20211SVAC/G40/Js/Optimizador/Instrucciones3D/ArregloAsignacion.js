"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.ArregloAsignaciono = void 0;
var ArregloAsignaciono = /** @class */ (function () {
    function ArregloAsignaciono(temporal, codigo, linea, columna, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.temporal = temporal;
    }
    ArregloAsignaciono.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    ArregloAsignaciono.prototype.getTipo = function () {
        return this.tipo;
    };
    ArregloAsignaciono.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return ArregloAsignaciono;
}());
//exports.ArregloAsignaciono = ArregloAsignaciono;
