"use strict";
exports.__esModule = true;
exports.Function = void 0;
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Function = /** @class */ (function () {
    function Function(variables, identificador, valor, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.variables = variables;
        this.identificador = identificador;
        this.valor = valor;
        this.tipo = tipo;
    }
    Function.prototype.ejecutar = function (ent) {
        return this.valor.getValorImplicito(ent);
    };
    Function.prototype.getVariables = function () {
        return this.variables;
    };
    return Function;
}());
exports.Function = Function;
