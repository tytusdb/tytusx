"use strict";
exports.__esModule = true;
var TableSimbols = require("../AST/TSXQuery.js");
var Valor_1 = require("../AST/Valor");
var Simbolo_1 = require("../AST/Simbolo");
var Funcion = /** @class */ (function () {
    function Funcion(prefijo, nombre, parametros, tipoRetorno, sentencias, linea, columna, t) {
        this.prefijo = prefijo;
        this.nombre = nombre,
            this.parametros = parametros;
        this.tipoRetorno = tipoRetorno;
        this.sentencias = sentencias;
        this.linea = linea;
        this.columna = columna;
        this.t = t;
    }
    Funcion.prototype.ejecutar = function (entorno, ast) {
        if (entorno.ExisteFuncion(ast.nombre) != null) {
            console.log("Ya hay una función con el mismo nombre");
        }
        else {
            var valor = new Valor_1["default"]("Función", ast, "");
            var simbolo = new Simbolo_1["default"](ast.nombre, valor, entorno.nombre, ast.linea, ast.columna, -1);
            entorno.AddFuncion(simbolo);
        }
    };
    return Funcion;
}());
exports["default"] = Funcion;
