"use strict";
exports.__esModule = true;
exports.Atri = void 0;
var Tipo_1 = require("../AST/Tipo");
var Atri = /** @class */ (function () {
    function Atri(tk_id, la, l, c) {
        this.tk_id = tk_id;
        this.la = la;
        this.linea = l;
        this.columna = c;
    }
    Atri.prototype.getTipo = function (ent, arbol) {
        return Tipo_1.Tipo.CADENA;
    };
    Atri.prototype.getValorImplicito = function (ent, arbol) {
        return this.tk_id;
    };
    return Atri;
}());
exports.Atri = Atri;
