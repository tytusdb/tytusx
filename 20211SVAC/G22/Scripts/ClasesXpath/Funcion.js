"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
var Funcion = /** @class */ (function () {
    function Funcion(tipo, linea, columna) {
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    Funcion.prototype.getTipo = function (arbol) {
        //dependiendo del nombre entonces asignamos su tipo
        return this.tipo;
    };
    Funcion.prototype.getValorImplicito = function (arbol) {
        //buscamos del nodo que tenemos lo que nos pide como last(), text(), node(), position() y eso retornamos
        return this.tipo;
    };
    return Funcion;
}());
exports.Funcion = Funcion;
