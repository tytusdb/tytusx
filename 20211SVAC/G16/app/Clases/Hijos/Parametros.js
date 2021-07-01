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
    Parametros.prototype.ejecutar = function (entorno) {
        throw new Error('Method not implemented.');
    };
    Parametros.prototype.insertSimbolsTable = function (node, anterior, eEntorno) {
        var repetido = false;
        var lista = TableSimbols.TableSimbols.getLista();
        lista.forEach(function (element) {
            if (element.Valor.Tipo == "Parámetro" && element.Nombre == node.variable && element.Padre == anterior) {
                console.log("error semántico");
                repetido = true;
            }
        });
        if (!repetido) {
            var valor = new Valor_1["default"]("Parámetro", node, "");
            var simbolo = new Simbolo_1["default"](node.variable, valor, anterior, node.linea, node.columna, -1);
            eEntorno.Add(simbolo);
            // TableSimbols.TableSimbols.add(simbolo);
            if (node.params != null) {
                node.params.insertSimbolsTable(node.params, anterior, eEntorno);
            }
        }
        return eEntorno;
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
