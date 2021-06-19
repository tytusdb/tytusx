"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
var TipoDato_1 = require("../../InterpreteXML/TablaSimbolo/TipoDato");
var Expresion = /** @class */ (function () {
    function Expresion(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    Expresion.prototype.BuscarEntorno = function (datos, id, final, pos) {
        var entornos = datos;
        var aux = [];
        if (pos !== 0) {
            for (var j = 0; j < entornos.length; j++) {
                if (entornos[j].id === id) {
                    aux.push(entornos[j]);
                }
            }
            entornos = [];
            entornos.push(aux[pos - 1]);
            aux = [];
        }
        entornos.forEach(function (element) {
            if (element.id === id && element.getTipo() === TipoDato_1.TipoDato.ETIQUETA) {
                if (final) {
                    aux.push(element);
                }
                else {
                    element.entorno.forEach(function (hijo) {
                        aux.push(hijo);
                    });
                }
            }
        });
        entornos = aux;
        return entornos;
    };
    return Expresion;
}());
exports.Expresion = Expresion;
