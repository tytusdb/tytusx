"use strict";
exports.__esModule = true;
exports.Let = void 0;
var Simbolo_1 = require("../AST/Simbolo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Let = /** @class */ (function () {
    function Let(linea, columna, valor, identificador) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.identificador = identificador;
    }
    Let.prototype.ejecutar = function (ent) {
        //creamos una variable en la tabla de simbolos del entorno global y le mandamos el objeto como valor  
        var new_simbol = new Simbolo_1.Simbolo(this.identificador, this.valor.getTipo(ent), this.linea, this.columna, this.valor.getValorImplicito(ent));
        //se agrega el simbolo al entorno
        ent.agregar(new_simbol);
    };
    //obtener contador
    Let.prototype.GetCountStorage = function () {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    };
    //actualizar contador
    Let.prototype.SetStorage = function (contador) {
        localStorage.setItem('contador', JSON.stringify(contador));
    };
    return Let;
}());
exports.Let = Let;
