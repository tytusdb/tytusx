"use strict";
var ObjetoA = /** @class */ (function () {
    function ObjetoA(objeto, idAST, idCST) {
        this.objeto = objeto;
        this.idAST = idAST;
        this.idCST = idCST;
    }
    ObjetoA.prototype.getObjeto = function () {
        return this.objeto;
    };
    ObjetoA.prototype.getIdAST = function () {
        return this.idAST;
    };
    ObjetoA.prototype.getIdCST = function () {
        return this.idAST;
    };
    return ObjetoA;
}());
exports.ObjetoA = ObjetoA;
