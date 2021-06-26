"use strict";
exports.__esModule = true;
exports.Parametros = void 0;
var Parametros = /** @class */ (function () {
    function Parametros(variable, tipo) {
        this.variable = variable;
        this.tipo = tipo;
    }
    Parametros.prototype.getTipo = function () {
        return this.tipo;
    };
    Parametros.prototype.getVariable = function () {
        return this.variable;
    };
    return Parametros;
}());
exports.Parametros = Parametros;
