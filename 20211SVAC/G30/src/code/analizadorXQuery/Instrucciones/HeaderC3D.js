"use strict";
exports.__esModule = true;
exports.HeaderC3D = void 0;
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var HeaderC3D = /** @class */ (function () {
    function HeaderC3D(linea, columna, salida, identificador) {
        this.linea = linea;
        this.columna = columna;
        this.salida = salida;
        this.identificador = identificador;
    }
    HeaderC3D.prototype.ejecutar = function (ent) {
        this.salida += '';
    };
    //obtener contador
    HeaderC3D.prototype.GetCountStorage = function () {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    };
    //actualizar contador
    HeaderC3D.prototype.SetStorage = function (contador) {
        localStorage.setItem('contador', JSON.stringify(contador));
    };
    return HeaderC3D;
}());
exports.HeaderC3D = HeaderC3D;
