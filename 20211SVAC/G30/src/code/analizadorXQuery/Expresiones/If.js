"use strict";
exports.__esModule = true;
exports.If = void 0;
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var If = /** @class */ (function () {
    function If(linea, columna, condition, if_then, if_else) {
        this.linea = linea;
        this.columna = columna;
        this.condition = condition;
        this.if_then = if_then;
        this.if_else = if_else;
    }
    If.prototype.getTipo = function (ent) {
        return 'IF';
    };
    If.prototype.getValorImplicito = function (ent) {
        if (this.condition.getValorImplicito(ent)) {
            return this.if_then.getValorImplicito(ent);
        }
        else {
            return this.if_else.getValorImplicito(ent);
        }
    };
    return If;
}());
exports.If = If;
