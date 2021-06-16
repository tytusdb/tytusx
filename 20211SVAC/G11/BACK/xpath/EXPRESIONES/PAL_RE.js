"use strict";
exports.__esModule = true;
exports.PAL_RE = void 0;
var Tipo_1 = require("../AST/Tipo");
var PAL_RE = /** @class */ (function () {
    function PAL_RE(pr, op, l, c) {
        this.pr = pr;
        this.op = op;
        this.linea = l;
        this.columna = c;
    }
    PAL_RE.prototype.getTipo = function (ent, arbol) {
        return Tipo_1.Tipo.CADENA;
    };
    PAL_RE.prototype.getValorImplicito = function (ent, arbol) {
        return this.pr;
    };
    return PAL_RE;
}());
exports.PAL_RE = PAL_RE;
