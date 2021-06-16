"use strict";
exports.Regla = void 0;
var Regla = /** @class */ (function () {
    function Regla(tipo1, produccion1, reglaSemantica1) {
        this.tipo = tipo1;
        this.produccion = produccion1;
        this.reglaSemantica = reglaSemantica1;
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
