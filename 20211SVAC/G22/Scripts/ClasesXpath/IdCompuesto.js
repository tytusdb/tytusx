"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdCompuesto = void 0;
var TiposXpath_1 = require("./TiposXpath");
var IdCompuesto = /** @class */ (function () {
    function IdCompuesto(nombreId, predicado, linea, columna) {
        this.nombreId = nombreId;
        this.tipo = TiposXpath_1.TiposXpath.ID_PREDICADO;
        this.listaPredicados = predicado;
        this.linea = linea;
        this.columna = columna;
    }
    IdCompuesto.prototype.getTipo = function (arbol) {
        return this.tipo;
    };
    IdCompuesto.prototype.getId = function () {
        return this.nombreId;
    };
    IdCompuesto.prototype.getValorImplicito = function (arbol) {
        //imprimir los predicados 
        /*        for (let i = 0; i < this.listaPredicados.length; i++) {
                    console.log("Predicado ---> " + this.listaPredicados[i]);
                }
        */
        return this.listaPredicados;
    };
    return IdCompuesto;
}());
exports.IdCompuesto = IdCompuesto;
