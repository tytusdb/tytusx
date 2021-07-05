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
        var simb = [];
        simb = simb.concat(this.GetTablaStorage());
        simb.push(new_simbol);
        this.SetTablaStorage(simb);
        //se agrega el simbolo al entorno
        ent.agregar(new_simbol);
    };
    //obtener contador
    Let.prototype.GetCountStorage = function () {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    };
    //actualizar contador
    Let.prototype.SetCountStorage = function (contador) {
        localStorage.setItem('contador', JSON.stringify(contador));
    };
    Let.prototype.VariableC3D = function (ent) {
        try {
            var variable = [];
            var id = this.identificador;
            var valor = this.valor.getValorImplicito(ent);
            variable.push(id);
            if (typeof (valor) == 'number') {
                variable.push([valor]);
            }
            else if (typeof (valor) == 'string') {
                var val_temp = [];
                for (var i = 0; i < valor.length; i++) {
                    val_temp.push(valor[i].charCodeAt(0));
                }
                variable.push(val_temp);
            }
            return variable;
        }
        catch (error) {
            var variable = [];
            var id = this.identificador;
            var valor = this.valor;
            variable.push(id);
            if (typeof (valor) == 'number') {
                variable.push([valor]);
            }
            else if (typeof (valor) == 'string') {
                var val_temp = [];
                for (var i = 0; i < valor.length; i++) {
                    val_temp.push(valor[i].charCodeAt(0));
                }
                variable.push(val_temp);
            }
            return variable;
        }
    };
    //obtener tabla simbolos
    Let.prototype.GetTablaStorage = function () {
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    };
    //actualizar contador
    Let.prototype.SetTablaStorage = function (tabla) {
        localStorage.setItem('tabla', JSON.stringify(tabla));
    };
    return Let;
}());
exports.Let = Let;
