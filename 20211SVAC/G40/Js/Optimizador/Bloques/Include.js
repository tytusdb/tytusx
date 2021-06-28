"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Include = void 0;
var Include = /** @class */ (function () {
    function Include(linea, columna, codigo, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.instrucciones = [];
    }
    Include.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    Include.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Include.prototype.getTipo = function () {
        return this.tipo;
    };
    Include.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Include;
}());
//exports.Include = Include;
