"use strict";
exports.__esModule = true;
exports.contador = exports.AST = void 0;
var Entorno_1 = require("../Entorno/Entorno");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var LlamadaF_1 = require("../Funciones/LlamadaF");
var ExpresionXQ_1 = require("./ExpresionXQ");
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
            else if (ins instanceof ExpresionXQ_1.ExpresionXQ) {
                if (ins instanceof LlamadaF_1.LlamadaF) {
                    var alv = ins.getValor(_this.tablaGlobal);
                    if ((alv.tipo.tipo != TipoXQ_1.EnumTipo.error) && (alv.tipo.tipo != TipoXQ_1.EnumTipo.defecto) &&
                        (alv.tipo.tipo != TipoXQ_1.EnumTipo.tvoid) && (alv.tipo.tipo != TipoXQ_1.EnumTipo.nulo) &&
                        (alv.tipo.tipo != TipoXQ_1.EnumTipo.funcion)) {
                        console.log(">> " + alv.valor);
                    } else {
                        console.log(">> ERROR");
                    }
                }
                else {
                    ins.getValor(_this.tablaGlobal);
                }
            }
            else {
                console.log('Tipo de inst. no contemplada');
            }
        });
    };
    AST.contador = 0;
    return AST;
}());
exports.AST = AST;
exports.contador = 0;
