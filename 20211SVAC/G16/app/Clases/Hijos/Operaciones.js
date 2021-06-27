"use strict";
exports.__esModule = true;
exports.Operacion = void 0;
var Operacion = /** @class */ (function () {
    function Operacion(tipo, operador1, operador2) {
        this.tipo = tipo;
        this.operador1 = operador1;
        this.operador2 = operador2;
    }
    Operacion.prototype.ejecutar = function (Entorno) {
        throw new Error('Method not implemented.');
    };
    return Operacion;
}());
exports.Operacion = Operacion;
