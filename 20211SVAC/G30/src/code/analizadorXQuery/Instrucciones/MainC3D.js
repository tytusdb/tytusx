"use strict";
exports.__esModule = true;
exports.MainC3d = void 0;
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var MainC3d = /** @class */ (function () {
    function MainC3d(linea, columna, salida, identificador) {
        this.linea = linea;
        this.columna = columna;
        this.salida = salida;
        this.identificador = identificador;
    }
    MainC3d.prototype.ejecutar = function (ent) {
        this.salida += '';
    };
    //obtener contador
    MainC3d.prototype.GetCountStorage = function () {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    };
    //actualizar contador
    MainC3d.prototype.SetStorage = function (contador) {
        localStorage.setItem('contador', JSON.stringify(contador));
    };
    return MainC3d;
}());
exports.MainC3d = MainC3d;
