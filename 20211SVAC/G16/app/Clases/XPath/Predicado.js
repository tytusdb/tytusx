"use strict";
exports.__esModule = true;
exports.Predicado = void 0;
var Predicado = /** @class */ (function () {
    function Predicado(exp) {
        this.expresion = exp;
    }
    Predicado.prototype.execute = function (padre) {
        var x = this.expresion.execute(padre);
        return x;
    };
    return Predicado;
}());
exports.Predicado = Predicado;
