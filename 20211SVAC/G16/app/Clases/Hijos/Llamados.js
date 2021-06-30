"use strict";
exports.__esModule = true;
exports.Llamado = void 0;
var Llamado = /** @class */ (function () {
    function Llamado(prefijos, identificador, parametros) {
        this.prefijos = prefijos;
        this.identificador = identificador;
        this.parametros = parametros;
    }
    Llamado.prototype.ejecutar = function (entorno) {
        throw new Error('Method not implemented.');
    };
    return Llamado;
}());
exports.Llamado = Llamado;
