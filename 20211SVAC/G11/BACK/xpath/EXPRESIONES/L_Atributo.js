"use strict";
exports.__esModule = true;
exports.L_Atributo = void 0;
var Tipo_1 = require("../AST/Tipo");
var L_Atributo = /** @class */ (function () {
    function L_Atributo(listaO, li, col) {
        this.puntos = listaO;
        this.linea = li;
        this.columna = col;
    }
    L_Atributo.prototype.getTipo = function (ent, arbol) {
        return Tipo_1.Tipo.CADENA;
    };
    L_Atributo.prototype.getValorImplicito = function (ent, arbol) {
        for (var _i = 0, _a = this.puntos; _i < _a.length; _i++) {
            var val = _a[_i];
            console.log(val);
        }
        return this.puntos;
    };
    return L_Atributo;
}());
exports.L_Atributo = L_Atributo;
