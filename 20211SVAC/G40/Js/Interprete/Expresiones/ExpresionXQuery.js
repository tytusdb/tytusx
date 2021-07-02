"use strict";

var ExpresionXQuery = /** @class */ (function () {
    function ExpresionXQuery(linea, columna, identificador, funcion) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.funcionXPath = funcion;
    }
    ExpresionXQuery.prototype.getTipo = function (ent, arbol) {
    };
    ExpresionXQuery.prototype.getValorImplicito = function (ent, arbol) {
    };
    return ExpresionXQuery;
}());

