"use strict";
exports.__esModule = true;
exports.Variable = void 0;
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Variable = /** @class */ (function () {
    function Variable(identificador, linea, columna) {
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }
    Variable.prototype.getTipo = function (ent) {
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
    Variable.prototype.getValorImplicito = function (ent) {
        console.log(ent);
        if (ent.existeEnActual(this.identificador)) {
            var output = '';
            var simbolo = ent.getSimbolo(this.identificador);
            if (simbolo.tipo == Tipo_1.Tipo.OBJETO) {
                if (typeof (simbolo.valor[0]) == 'number') {
                    return simbolo.valor;
                }
                else {
                    //se analiza el path
                    var parserXPath = new parse('/*');
                    //recorrer objetos
                    simbolo.valor.forEach(function (dato) {
                        //se ejecuta el path
                        var resultado_xpath = parserXPath.Ejecutar(dato);
                        output += resultado_xpath;
                    });
                    return output;
                }
            }
            else {
                if (typeof (simbolo.valor) == 'object') {
                    return simbolo.valor.getValorImplicito(ent);
                }
                return simbolo.valor;
            }
        }
        else {
            console.log('No existe la variable en el entorno actual');
            this.errores.push({
                Tipo: 'Sintáctico',
                Fila: this.linea,
                Columna: this.columna,
                Description: 'No existe la variable' + this.identificador + 'en el entorno actual'
            });
            var err = this.GetErrorStorage();
            this.errores = this.errores.concat(err);
            this.SetStorage(this.errores);
            return null;
        }
    };
    Variable.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    //obtener contador
    Variable.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    Variable.prototype.SetStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    return Variable;
}());
exports.Variable = Variable;
