"use strict";
exports.__esModule = true;
exports.ObjetoXPath = void 0;
var ObjetoXPath = /** @class */ (function () {
    function ObjetoXPath(v) {
        this.valor = v;
        this.atributo = false;
        this.ambito = "local";
        //this.exp = new Literal(69,'Error',-1,-1);
    }
    ObjetoXPath.prototype.setExpresion = function (E) {
        this.exp = E;
    };
    return ObjetoXPath;
}());
exports.ObjetoXPath = ObjetoXPath;
