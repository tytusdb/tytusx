"use strict";
exports.__esModule = true;
exports.For = void 0;
var Entorno_1 = require("../AST/Entorno");
var For = /** @class */ (function () {
    function For(variable, variable2, condiciones, contenido, linea, columna, retorno, t) {
        this.variable = variable;
        this.variable2 = variable2;
        this.condiciones = condiciones;
        this.contenido = contenido;
        this.linea = linea;
        this.columna = columna;
        this.retorno = retorno;
        this.t = t;
    }
    For.prototype.ejecutar = function (entorno, node) {
        console.log("pasó por el for");
        var nuevo = new Entorno_1["default"]("For", entorno);
        if (this.variable == "" && this.variable2 == "") {
            if (this.condiciones != null) {
                //en esta sección retorna el valor de la condición
                var retorno = this.condiciones.ejecutar(nuevo, this.condiciones);
                // si el valor de la condición es diferente de nulo e indefinido
                if (retorno != null && retorno != undefined) {
                    if (this.retorno != null) {
                        return this.retorno.ejecutar(nuevo, this.retorno);
                    }
                }
                else {
                }
            }
        }
        else if (this.variable != "" && this.variable2 == "") {
            if (this.condiciones != null) {
                var retorno = this.condiciones.ejecutar(entorno, this.condiciones);
                if (this.contenido != null) {
                    this.contenido.ejecutar(entorno, this.contenido);
                }
            }
        }
    };
    return For;
}());
exports.For = For;
