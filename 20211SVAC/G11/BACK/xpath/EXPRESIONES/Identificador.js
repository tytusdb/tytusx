"use strict";
exports.__esModule = true;
exports.Identificador = void 0;
var Tipo_1 = require("../AST/Tipo");
var Identificador = /** @class */ (function () {
    function Identificador(id, ex, li, col) {
        this.identificador = id;
        this.exp = ex;
        this.linea = li;
        this.columna = col;
    }
    Identificador.prototype.getTipo = function (ent, arbol) {
        return Tipo_1.Tipo.IDENTIFICADOR;
    };
    Identificador.prototype.getValorImplicito = function (ent, arbol) {
        return Tipo_1.Tipo.IDENTIFICADOR;
    };
    Identificador.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return Identificador;
}());
exports.Identificador = Identificador;
