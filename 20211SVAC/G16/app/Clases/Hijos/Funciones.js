"use strict";
exports.__esModule = true;
var Operador_js_1 = require("./Operador.js");
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
        console.log("pasó por función");
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
        this.cantidad = 0;
        this.getCantidad(parametros);
        if (parseInt(this.cantidad, 10) != nuevo.variables.length) {
            alert("El número de parámetros no coincide");
            return;
        }
        else {
            //SE ASIGNA EL VALOR A LAS VARIABLES
            this.getParametros(parametros, nuevo);
            var resultado = this.sentencias.ejecutar(nuevo, this.sentencias);
            return resultado;
        }
    };
    Funcion.prototype.getParametros = function (params, entorno) {
        var _this = this;
        var entro = false;
        if (params.length != undefined) {
            params.forEach(function (element) {
                if (element instanceof Operador_js_1.Operador) {
                    var valor_1 = element.ejecutar(entorno, element);
                    entorno.variables.forEach(function (variable) {
                        if (variable.Valor.valor == null && valor_1 != null && entro == false) {
                            entorno.setVariable(variable.Nombre, valor_1);
                            entro = true;
                        }
                    });
                }
                else {
                    _this.getParametros(element, entorno);
                }
            });
        }
        else {
            if (params instanceof Operador_js_1.Operador) {
                var valor_2 = params.ejecutar(entorno, params);
                entorno.variables.forEach(function (variable) {
                    if (variable.Valor.valor == null && valor_2 != null && entro == false) {
                        entorno.setVariable(variable.Nombre, valor_2);
                        entro = true;
                    }
                });
            }
        }
    };
    Funcion.prototype.getCantidad = function (params) {
        var _this = this;
        if (params.length != undefined) {
            params.forEach(function (element) {
                if (element.length == undefined) {
                    _this.cantidad = _this.cantidad + 1;
                    console.log("*************************");
                    console.log(_this.cantidad);
                }
                else {
                    _this.getCantidad(element);
                }
            });
        }
        else {
            this.cantidad = this.cantidad + 1;
        }
    };
    return Funcion;
}());
exports["default"] = Funcion;
