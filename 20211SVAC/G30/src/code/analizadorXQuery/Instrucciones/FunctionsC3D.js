"use strict";
exports.__esModule = true;
exports.FunctionsC3D = void 0;
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var FunctionsC3D = /** @class */ (function () {
    function FunctionsC3D(linea, columna, salida, identificador) {
        this.linea = linea;
        this.columna = columna;
        this.salida = salida;
        this.identificador = identificador;
    }
    FunctionsC3D.prototype.ejecutar = function (ent) {
        this.salida += '';
    };
    //obtener contador
    FunctionsC3D.prototype.GetCountStorage = function () {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    };
    //actualizar contador
    FunctionsC3D.prototype.SetStorage = function (contador) {
        localStorage.setItem('contador', JSON.stringify(contador));
    };
    return FunctionsC3D;
}());
exports.FunctionsC3D = FunctionsC3D;
