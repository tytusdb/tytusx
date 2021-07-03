"use strict";
exports.__esModule = true;
exports.contador = exports.AST = void 0;
var Entorno_1 = require("../Entorno/Entorno");
var InstruccionXQ_1 = require("./InstruccionXQ");
var AST = /** @class */ (function () {
    function AST(lista) {
        this.listaInstrucciones = lista;
        this.tablaGlobal = new Entorno_1.EntornoXQ(null);
        this.tablaGlobal.global = this.tablaGlobal;
    }
    AST.prototype.ejecutar = function () {
        var _this = this;
        this.listaInstrucciones.forEach(function (ins) {
            if (ins instanceof InstruccionXQ_1.InstruccionXQ) {
                ins.ejecutar(_this.tablaGlobal);
            }
            else {
                ins.getValor(_this.tablaGlobal);
            }
        });
    };
    AST.contador = 0;
    return AST;
}());
exports.AST = AST;
exports.contador = 0;
