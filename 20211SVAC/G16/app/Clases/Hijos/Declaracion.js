"use strict";
exports.__esModule = true;
exports.Declaracion = void 0;
var Simbolo_1 = require("../AST/Simbolo");
var Valor_1 = require("../AST/Valor");
var TableSimbols = require("../AST/TSXQuery.js");
var Declaracion = /** @class */ (function () {
    function Declaracion(nombre, valor, linea, columna, t) {
        this.array = [];
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.t = t;
    }
    Declaracion.prototype.ejecutar = function (entorno, node) {
        if (entorno.buscarVariableEntorno(this.nombre, entorno) != null) {
            console.log("Ya existe una variable con este nombre");
        }
        else {
            var val = this.funcion(entorno, node, this.valor);
            var arreglito_1 = [];
            if (val == "Arreglito") {
                this.array.forEach(function (el) {
                    var valorcito = el.ejecutar(entorno, el);
                    if (valorcito != null) {
                        arreglito_1.push(valorcito);
                    }
                });
                if (arreglito_1.length != 0) {
                    var valor_1 = new Valor_1["default"]("Let", arreglito_1, "");
                    var simbolo_1 = new Simbolo_1["default"](this.nombre, valor_1, entorno.nombre, this.linea, this.columna, -1);
                    TableSimbols.TableSimbols.add(simbolo_1);
                    entorno.AddVariables(simbolo_1);
                }
                return;
            }
            else if (val == null) {
                console.log("F");
                return;
            }
            var valor = new Valor_1["default"]("Let", val, "");
            var simbolo = new Simbolo_1["default"](this.nombre, valor, entorno.nombre, this.linea, this.columna, -1);
            TableSimbols.TableSimbols.add(simbolo);
            entorno.AddVariables(simbolo);
        }
    };
    Declaracion.prototype.funcion = function (entorno, node, array) {
        var _this = this;
        if (this.valor.length == undefined) {
            return this.valor.ejecutar(entorno, node);
        }
        else {
            array.forEach(function (element) {
                if (element.length != undefined) {
                    _this.funcion(entorno, node, element);
                }
                else {
                    _this.array.push(element);
                }
            });
            return "Arreglito";
        }
    };
    return Declaracion;
}());
exports.Declaracion = Declaracion;
