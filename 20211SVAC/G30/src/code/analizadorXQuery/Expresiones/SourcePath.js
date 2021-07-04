"use strict";
exports.__esModule = true;
exports.SourcePath = void 0;
var Tipo_1 = require("../AST/Tipo");
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var SourcePath = /** @class */ (function () {
    function SourcePath(path, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.path = path;
    }
    SourcePath.prototype.getTipo = function (ent) {
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
    SourcePath.prototype.getValorImplicito = function (ent) {
        var path = this.path + '/node()';
        //se analiza el path
        var parserXPath = new parse(path);
        //obteniendo xml
        var data = JSON.parse(localStorage.getItem('XML'));
        //se ejecuta el path
        var resultado_xpath = parserXPath.Ejecutar(data);
        return resultado_xpath;
    };
    SourcePath.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return SourcePath;
}());
exports.SourcePath = SourcePath;
