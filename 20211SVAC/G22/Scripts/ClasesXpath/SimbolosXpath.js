"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimbolosXpath = void 0;
//en simbolos puede ser .   ..  *
var SimbolosXpath = /** @class */ (function () {
    function SimbolosXpath(tipo, linea, columna) {
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    SimbolosXpath.prototype.getTipo = function (arbol) {
        return this.tipo;
    };
    SimbolosXpath.prototype.getValorImplicito = function (arbol) {
        return this.tipo;
    };
    return SimbolosXpath;
}());
exports.SimbolosXpath = SimbolosXpath;
