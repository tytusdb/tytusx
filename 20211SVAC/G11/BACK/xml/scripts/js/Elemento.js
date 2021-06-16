"use strict";
exports.__esModule = true;
exports.Elemento = void 0;
var Elemento = /** @class */ (function () {
    function Elemento(id, texto, linea, columna, listaA, listaO, id2) {
        this.identificador = id;
        this.identificador2 = id2;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaA;
        this.listaElementos = listaO;
        this.entorno = new Entorno(null);
    }
    return Elemento;
}());
exports.Elemento = Elemento;
