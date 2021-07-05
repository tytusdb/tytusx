"use strict";
exports.__esModule = true;
exports.LowerCase = void 0;
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var LowerCase = /** @class */ (function () {
    function LowerCase(linea, columna, valor) {
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    LowerCase.prototype.getTipo = function (ent) {
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
    LowerCase.prototype.getValorImplicito = function (ent) {
        var texto = this.valor.getValorImplicito(ent);
        if (typeof (texto) == 'string') {
            return texto.toLowerCase();
        }
        else {
            this.errores.push({
                Tipo: 'Sintáctico',
                Fila: this.linea,
                Columna: this.columna,
                Description: 'Tipo de dato ' + typeof (texto) + ' incorrecto'
            });
            var err = this.GetErrorStorage();
            this.errores = this.errores.concat(err);
            this.SetStorage(this.errores);
            return 'null';
        }
    };
    LowerCase.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    //obtener contador
    LowerCase.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    LowerCase.prototype.SetStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    return LowerCase;
}());
exports.LowerCase = LowerCase;
