"use strict";
exports.__esModule = true;
exports.Substring = void 0;
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Substring = /** @class */ (function () {
    function Substring(linea, columna, valor, num1, num2) {
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.num1 = num1;
        this.num2 = num2;
    }
    Substring.prototype.getTipo = function (ent) {
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
    Substring.prototype.getValorImplicito = function (ent) {
        var text = this.valor.getValorImplicito(ent);
        var resultado = '';
        if (typeof (text) == 'string' && this.num1 < this.num2 && this.num2 < text.length && this.num1 >= 0) {
            for (var i = this.num1; i <= this.num2; i++) {
                resultado += text[i];
            }
            return resultado;
        }
        else {
            console.log('Valores incorrectos al llamar la funcion..');
            this.errores.push({
                Tipo: 'Sintáctico',
                Fila: this.linea,
                Columna: this.columna,
                Description: 'Valores incorrectos al llamar la funcion'
            });
            var err = this.GetErrorStorage();
            this.errores = this.errores.concat(err);
            this.SetStorage(this.errores);
            return 'null';
        }
    };
    Substring.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    //obtener contador
    Substring.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    Substring.prototype.SetStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    return Substring;
}());
exports.Substring = Substring;
