"use strict";
exports.__esModule = true;
exports.contador = exports.AST = void 0;
var Entorno_1 = require("../Entorno/Entorno");
var SimboloXQ_1 = require("../Entorno/SimboloXQ");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var LlamadaF_1 = require("../Funciones/LlamadaF");
var For_1 = require("../Instrucciones/For");
var ExpresionXQ_1 = require("./ExpresionXQ");
var InstruccionXQ_1 = require("./InstruccionXQ");
var parseXML = require('../../../../analizadorXML/grammar');
var AST = /** @class */ (function () {
    function AST(lista) {
        this.listaInstrucciones = lista;
        this.tablaGlobal = new Entorno_1.EntornoXQ(null);
        this.tablaGlobal.global = this.tablaGlobal;
    }
    AST.prototype.ejecutar = function (inputXML) {
        var _this = this;
        //Creacion XML interno
        var texto = new SimboloXQ_1.SimboloXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.defecto), inputXML);
        this.tablaGlobal.insertar('#XML#', texto, 0, 0, 'La variable');
        //Ejecucion XQuery
        var salidas = [];
        this.listaInstrucciones.forEach(function (ins) {
            if (ins instanceof InstruccionXQ_1.InstruccionXQ) {
                var auxx = ins.ejecutar(_this.tablaGlobal);
                if (ins instanceof For_1.ForXQ) {
                    if (auxx != null) {
                        var temp = void 0;
                        for (var _i = 0, auxx_1 = auxx; _i < auxx_1.length; _i++) {
                            var arry = auxx_1[_i];
                            salidas.push(arry);
                        }
                    }
                }
            }
            else if (ins instanceof ExpresionXQ_1.ExpresionXQ) {
                if (ins instanceof LlamadaF_1.LlamadaF) {
                    var alv = ins.getValor(_this.tablaGlobal);
                    if ((alv.tipo.tipo != TipoXQ_1.EnumTipo.error) && (alv.tipo.tipo != TipoXQ_1.EnumTipo.defecto) &&
                        (alv.tipo.tipo != TipoXQ_1.EnumTipo.tvoid) && (alv.tipo.tipo != TipoXQ_1.EnumTipo.nulo) &&
                        (alv.tipo.tipo != TipoXQ_1.EnumTipo.funcion)) {
                        salidas.push(alv.valor);
                        //console.log(">> " + alv.valor);
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
        return salidas;
    };
    return AST;
}());
exports.AST = AST;
exports.contador = 0;
