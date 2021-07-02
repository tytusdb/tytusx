"use strict";
exports.__esModule = true;
exports.Loop = void 0;
var Simbolo_1 = require("../AST/Simbolo");
var Valor_1 = require("../AST/Valor");
var TableSimbols = require("../AST/TSXQuery.js");
var Loop = /** @class */ (function () {
    function Loop(variable, condiciones, linea, columna, loop, t) {
        this.arreglito = [];
        this.global = [];
        this.variable = variable;
        this.condiciones = condiciones;
        this.linea = linea;
        this.columna = columna;
        this.loop = loop;
        this.t = t;
    }
    Loop.prototype.ejecutar = function (entorno, node) {
        if (this.condiciones != null) {
            if (this.condiciones.length != undefined) {
                this.verificar(this.condiciones, entorno);
                if (this.arreglito.length != 0) {
                    this.global.push(this.arreglito);
                    var valor = new Valor_1["default"]("Variable", this.arreglito, "");
                    var simbolo = new Simbolo_1["default"](this.variable, valor, entorno.nombre, this.linea, this.columna, -1);
                    entorno.AddVariables(simbolo);
                    entorno.arreglo.push({ variable: this.variable, array: this.arreglito });
                    TableSimbols.TableSimbols.add(simbolo);
                }
                if (this.loop != null) {
                    this.loop.ejecutar(entorno, this.loop);
                }
                else {
                    this.combinaciones(entorno.arreglo, 0, -1, entorno);
                }
                return entorno;
            }
            else {
                var retorno = this.condiciones.ejecutar(entorno, this.condiciones);
                if (retorno != undefined && retorno != null) {
                    if (this.variable != "") {
                        var resultado = entorno.buscarVariable(this.variable, entorno);
                        if (resultado == null) {
                            var valor = new Valor_1["default"]("Variable", retorno, "");
                            var simbolo = new Simbolo_1["default"](this.variable, valor, entorno.nombre, this.linea, this.columna, -1);
                            entorno.AddVariables(simbolo);
                            TableSimbols.TableSimbols.add(simbolo);
                            return retorno;
                        }
                        else {
                            //error, ya hay una variable con el mismo nombre
                        }
                    }
                }
            }
        }
    };
    Loop.prototype.verificar = function (condiciones, entorno) {
        var _this = this;
        condiciones.forEach(function (element) {
            if (element.length == undefined) {
                var ver = element.ejecutar(entorno, element);
                if (ver != null && ver != undefined) {
                    _this.arreglito.push(ver);
                }
            }
            else {
                _this.verificar(element, entorno);
            }
        });
    };
    Loop.prototype.combinaciones = function (arreglo, aux, cant, entorno) {
        var cantidad = 1;
        var bandera = false;
        var nuevo = [];
        for (var index = 0; index < arreglo.length; index++) {
            var element = arreglo[index].array;
            if (index != aux) {
                cantidad = Number(cantidad) * Number(element.length);
                nuevo.push(arreglo[index]);
            }
            if (arreglo.length == 1) {
                cantidad = 1;
                nuevo.push(arreglo[index]);
                bandera = true;
            }
        }
        if (nuevo.length != 0) {
            var auxi = [];
            if (cant == -1) {
                var arreglito = arreglo[0].array;
                for (var index = 0; index < arreglito.length; index++) {
                    var contador = cantidad;
                    while (contador > 0) {
                        var element = arreglito[index];
                        auxi.push(element);
                        contador = Number(contador) - 1;
                    }
                }
                cant = cantidad;
                var simbolo = entorno.setVariable(arreglo[0].variable, auxi);
                if (simbolo != null) {
                    // TableSimbols.TableSimbols.add(simbolo);
                }
                else {
                    console.log("F");
                }
            }
            else {
                var contador = cant;
                var arreglito = arreglo[0].array;
                while (auxi.length < contador) {
                    for (var index = 0; index < arreglito.length; index++) {
                        var cont = cantidad;
                        while (cont > 0) {
                            auxi.push(arreglito[index]);
                            cont = Number(cont) - 1;
                        }
                    }
                }
                var simbolo = entorno.setVariable(arreglo[0].variable, auxi);
                if (simbolo != null) {
                    // TableSimbols.TableSimbols.add(simbolo);
                }
                else {
                    console.log("F");
                }
            }
            if (!bandera) {
                this.combinaciones(nuevo, aux, auxi.length, entorno);
            }
        }
    };
    return Loop;
}());
exports.Loop = Loop;
