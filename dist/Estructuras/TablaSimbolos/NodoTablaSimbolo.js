"use strict";
var Tipo;
(function (Tipo) {
    Tipo[Tipo["STRING"] = 0] = "STRING";
    Tipo[Tipo["INT"] = 1] = "INT";
    Tipo[Tipo["DOUBLE"] = 2] = "DOUBLE";
    Tipo[Tipo["BOOL"] = 3] = "BOOL";
    Tipo[Tipo["VOID"] = 4] = "VOID";
    Tipo[Tipo["OBJETO"] = 5] = "OBJETO";
    Tipo[Tipo["ATRIBUTO"] = 6] = "ATRIBUTO";
    Tipo[Tipo["NULL"] = 7] = "NULL";
    Tipo[Tipo["ARRAY"] = 8] = "ARRAY";
})(Tipo || (Tipo = {}));
var NodoTablaSimbolo = /** @class */ (function () {
    function NodoTablaSimbolo(indentificador, valor, tipo, linea, columna) {
        this.indentificador = indentificador;
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    NodoTablaSimbolo.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    NodoTablaSimbolo.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    return NodoTablaSimbolo;
}());
