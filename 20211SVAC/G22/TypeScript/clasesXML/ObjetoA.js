"use strict";
exports.__esModule = true;
exports.ObjetoA = void 0;
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
    ObjetoA.prototype.getIdCst = function () {
        return this.idAST;
    };
    return ObjetoA;
}());
exports.ObjetoA = ObjetoA;
