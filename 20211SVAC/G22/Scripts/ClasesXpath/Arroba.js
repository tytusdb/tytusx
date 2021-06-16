"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arroba = void 0;
//en simbolos puede ser .   ..  *
var Arroba = /** @class */ (function () {
    function Arroba(valorArroba, linea, columna) {
        this.valorArroba = valorArroba;
        this.linea = linea;
        this.columna = columna;
    }
    Arroba.prototype.getValorImplicito = function (arbol) {
        return this.valorArroba;
    };
    Arroba.prototype.getTipo = function (arbol) {
        //dependiendo si es asterisco o arroba se da el tipo de la arroba
        return 0;
    };
    return Arroba;
}());
exports.Arroba = Arroba;
