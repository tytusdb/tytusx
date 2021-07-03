"use strict";
exports.__esModule = true;
exports.AST = void 0;
var Entorno_1 = require("../Entorno/Entorno");
var AST = /** @class */ (function () {
    function AST(lista) {
        this.listaInstrucciones = lista;
        this.tablaGlobal = new Entorno_1.EntornoXQ(null);
        this.tablaGlobal.global = this.tablaGlobal;
    }
    AST.prototype.ejecutar = function () {
        var _this = this;
        this.listaInstrucciones.forEach(function (ins) {
            ins.ejecutar(_this.tablaGlobal);
        });
    };
    return AST;
}());
exports.AST = AST;
