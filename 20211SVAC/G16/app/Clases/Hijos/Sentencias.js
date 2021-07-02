"use strict";
exports.__esModule = true;
exports.Sentencia = void 0;
var Sentencia = /** @class */ (function () {
    function Sentencia(sentencia, lista, t) {
        this.sentencia = sentencia;
        this.lista = lista;
        this.t = t;
    }
    Sentencia.prototype.ejecutar = function (entorno, node) {
        if (this.lista != null) {
            this.lista.ejecutar(entorno, this.lista);
        }
        if (this.sentencia != null) {
            return this.sentencia.ejecutar(entorno, this.sentencia);
        }
    };
    return Sentencia;
}());
exports.Sentencia = Sentencia;
