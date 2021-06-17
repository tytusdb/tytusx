"use strict";
exports.__esModule = true;
exports.ObjetoXPath = void 0;
var ObjetoXPath = /** @class */ (function () {
    function ObjetoXPath(v) {
        this.valor = v;
        this.atributo = false;
        this.ambito = "local";
    }
    ObjetoXPath.prototype.copiarValor = function () {
        var nuevo = new ObjetoXPath(this.valor);
        nuevo.atributo = this.atributo;
        nuevo.ambito = this.ambito;
        if (this.exp != undefined) {
            nuevo.exp = this.exp.copiarValor();
        }
        else {
            nuevo.exp = undefined;
        }
        return nuevo;
    };
    ObjetoXPath.prototype.setExpresion = function (E) {
        this.exp = E;
    };
    return ObjetoXPath;
}());
exports.ObjetoXPath = ObjetoXPath;
