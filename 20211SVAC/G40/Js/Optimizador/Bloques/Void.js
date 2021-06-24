"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Void = void 0;
var Void = /** @class */ (function () {
    function Void(id, linea, columna, codigo, tipo, instrucciones) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.instrucciones = instrucciones;
        this.identificador = id;
    }
    Void.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    Void.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Void.prototype.getTipo = function () {
        return this.tipo;
    };
    Void.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Void;
}());
//exports.Void = Void;
