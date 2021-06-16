"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, nombre, valor, linea, columna) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };
    Simbolo.prototype.getNombre = function () {
        return this.nombre;
    };
    Simbolo.prototype.getValor = function () {
        return this.valor;
    };
    Simbolo.prototype.getLinea = function () {
        return this.linea;
    };
    Simbolo.prototype.getColumna = function () {
        return this.columna;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
