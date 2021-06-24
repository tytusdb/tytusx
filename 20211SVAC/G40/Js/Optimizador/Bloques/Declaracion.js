"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Declaracion = void 0;
var Declaracion = /** @class */ (function () {
    function Declaracion(linea, columna, codigo, tipo, ids) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.instrucciones = [];
        this.ids = ids;
    }
    Declaracion.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    Declaracion.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Declaracion.prototype.getTipo = function () {
        return this.tipo;
    };
    Declaracion.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Declaracion;
}());
//exports.Declaracion = Declaracion;
