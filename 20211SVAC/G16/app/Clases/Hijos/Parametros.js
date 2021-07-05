"use strict";
exports.__esModule = true;
exports.Parametros = void 0;
var Simbolo_1 = require("../AST/Simbolo");
var Valor_1 = require("../AST/Valor");
var TableSimbols = require("../AST/TSXQuery.js");
var Parametros = /** @class */ (function () {
    function Parametros(variable, tipo, linea, columna, params) {
        this.variable = variable;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
        this.params = params;
    }
    Parametros.prototype.ejecutar = function (entorno, node) {
        var _this = this;
        entorno.variables.forEach(function (variable) {
            if (variable.Nombre == _this.variable) {
                console.log("LA VARIABLE YA EXISTE");
                return null;
            }
        });
        var valor = new Valor_1["default"]("Parámetro", null, "");
        var simbolo = new Simbolo_1["default"](this.getVariable(), valor, entorno.nombre, node.linea, node.columna, -1);
        entorno.AddVariables(simbolo);
        //TableSimbols.TableSimbols.add(simbolo);
        if (this.params != null) {
            this.params.ejecutar(entorno, this.params);
        }
    };
    Parametros.prototype.getTipo = function () {
        return this.tipo;
    };
    Parametros.prototype.getVariable = function () {
        return this.variable;
    };
    return Parametros;
}());
exports.Parametros = Parametros;
