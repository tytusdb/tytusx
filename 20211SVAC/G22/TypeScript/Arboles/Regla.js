"use strict";
exports.__esModule = true;
exports.Regla = void 0;
var Regla = /** @class */ (function () {
    function Regla(tipo, produccion, reglaSemantica) {
        this.tipo = tipo;
        this.produccion = produccion;
        this.reglaSemantica = reglaSemantica;
    }
    Regla.prototype.getProduccion = function () {
        return this.produccion;
    };
    Regla.prototype.getReglaSemantica = function () {
        return this.reglaSemantica;
    };
    return Regla;
}());
exports.Regla = Regla;
