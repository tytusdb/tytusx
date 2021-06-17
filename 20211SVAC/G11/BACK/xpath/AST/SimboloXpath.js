"use strict";
exports.__esModule = true;
exports.SimboloXpath = void 0;
var SimboloXpath = /** @class */ (function () {
    function SimboloXpath(tipo, id, linea, columna) {
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }
    SimboloXpath.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    SimboloXpath.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    return SimboloXpath;
}());
exports.SimboloXpath = SimboloXpath;
