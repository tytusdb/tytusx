"use strict";
exports.__esModule = true;
exports.Path = void 0;
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var Path = /** @class */ (function () {
    function Path(valor, identificador, linea, columna) {
        this.errores = [];
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.identificador = identificador;
    }
    Path.prototype.getTipo = function (ent) {
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
    Path.prototype.getValorImplicito = function (ent) {
        var output = [];
        if (ent.existeEnActual(this.identificador)) {
            //se analiza el path
            var parserXPath = new parse(this.valor + '/node()');
            //valor de la tabla de simbolos
            var data = ent.getSimbolo(this.identificador).valor;
            //recorrer objetos
            data.forEach(function (dato) {
                //se ejecuta el path
                var resultado_xpath = parserXPath.Ejecutar(dato);
                output.push(resultado_xpath);
            });
        }
        else {
            console.log('La variable ' + this.valor + ' no existe, error semantico..');
            this.errores.push({
                Tipo: 'Sintáctico',
                Fila: this.linea,
                Columna: this.columna,
                Description: 'La variable ' + this.valor + ' no existe'
            });
            var err = this.GetErrorStorage();
            this.errores = this.errores.concat(err);
            this.SetStorage(this.errores);
        }
        return output;
    };
    Path.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    //obtener contador
    Path.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    //actualizar contador
    Path.prototype.SetStorage = function (error) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    };
    return Path;
}());
exports.Path = Path;
