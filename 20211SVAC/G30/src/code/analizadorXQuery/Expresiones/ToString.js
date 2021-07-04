"use strict";
exports.__esModule = true;
exports.ToString = void 0;
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var ToString = /** @class */ (function () {
    function ToString(linea, columna, valor) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    ToString.prototype.getTipo = function (ent) {
        var valor = this.getValorImplicito(ent);
        if (typeof (valor) === 'boolean') {
            return Tipo_1.Tipo.BOOLEAN;
        }
        else if (typeof (valor) === 'string') {
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.VOID;
    };
    ToString.prototype.getValorImplicito = function (ent) {
        var texto = this.valor.getValorImplicito(ent);
        return texto.toString();
    };
    ToString.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return ToString;
}());
exports.ToString = ToString;
