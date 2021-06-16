"use strict";
exports.__esModule = true;
exports.Atributo = void 0;
var Tipo_1 = require("../AST/Tipo");
var Atributo = /** @class */ (function () {
    function Atributo(bar, pu, li, col) {
        this.barras = bar;
        this.puntos = pu;
        this.linea = li;
        this.columna = col;
    }
    Atributo.prototype.getTipo = function (ent, arbol) {
        return Tipo_1.Tipo.CADENA;
    };
    Atributo.prototype.getValorImplicito = function (ent, arbol) {
        return this.barras + this.puntos;
    };
    return Atributo;
}());
exports.Atributo = Atributo;
