"use strict";
exports.__esModule = true;
exports.NodoConsulta = void 0;
var NodoConsulta = /** @class */ (function () {
    function NodoConsulta(id, accion, val) {
        this.accion = accion;
        this.id = id;
        this.valor = val;
    }
    NodoConsulta.prototype.getaccion = function () {
        return this.accion;
    };
    NodoConsulta.prototype.getid = function () {
        return this.id;
    };
    NodoConsulta.prototype.getval = function () {
        return this.valor;
    };
    return NodoConsulta;
}());
exports.NodoConsulta = NodoConsulta;
