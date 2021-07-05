"use strict";
exports.__esModule = true;
var TableSimbols = require("../AST/TSXQuery.js");
var Valor_1 = require("../AST/Valor");
var Simbolo_1 = require("../AST/Simbolo");
var Entorno_1 = require("../AST/Entorno");
var Funcion = /** @class */ (function () {
    function Funcion(prefijo, nombre, parametros, tipoRetorno, sentencias, linea, columna, t) {
        this.cantidad = 0;
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
        console.log("__________ESTÁ EN FUNCIÓN___________");
        if (entorno.ExisteFuncion(ast.nombre, entorno) != null) {
            console.log("Ya hay una función con el mismo nombre");
        }
        else {
            var valor = new Valor_1["default"]("Función", ast, "");
            var simbolo = new Simbolo_1["default"](ast.nombre, valor, entorno.nombre, ast.linea, ast.columna, -1);
            entorno.AddFuncion(simbolo);
            TableSimbols.TableSimbols.add(simbolo);
        }
    };
    Funcion.prototype.ejecutar2 = function (entorno, parametros) {
        var nuevo = new Entorno_1["default"]("For", entorno);
        if (this.parametros != null) {
            this.parametros.ejecutar(nuevo, this.parametros);
        }
        //   if(parametros.length==nuevo.variables.length){
        for (var i = 0; i < nuevo.variables.length; i++) {
            nuevo.setVariable(nuevo.variables[i].Nombre, parametros[i]);
        }
        var resultado = this.sentencias.ejecutar(nuevo, this.sentencias);
        return resultado;
        /* }else{
           alert("El número de parámetros no coincide con la función a llamar")
         }*/
    };
    return Funcion;
}());
exports["default"] = Funcion;
