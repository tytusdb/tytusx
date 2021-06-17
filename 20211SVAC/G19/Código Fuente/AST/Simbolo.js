"use strict";
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, linea, columna, valor, Entorno, TablaSimbolos) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.Entorno = Entorno;
        this.TablaSimbolos = TablaSimbolos;
    }
    Simbolo.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    Simbolo.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    return Simbolo;
}());
