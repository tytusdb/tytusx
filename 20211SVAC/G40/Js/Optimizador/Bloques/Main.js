"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Main = void 0;
var Main = /** @class */ (function () {
    function Main(linea, columna, codigo, tipo, instrucciones) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = codigo;
        this.tipo = tipo;
        this.instrucciones = instrucciones;
    }
    Main.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    Main.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Main.prototype.getTipo = function () {
        return this.tipo;
    };
    Main.prototype.getCodigo3D = function () {
        return this.codigo;
    };
    return Main;
}());
//exports.Main = Main;
