"use strict";
function Simbolo(identificador, valor, tipo, entorno, tipoEtiqueta) {
    return {
        identificador: identificador,
        valor: valor,
        tipo: tipo,
        entorno: entorno,
        tipoEtiqueta: tipoEtiqueta
    };
}
var TablaSimbolos = /** @class */ (function () {
    function TablaSimbolos(tabla, padre, entorno) {
        this.simbolos = tabla;
        this.padre = padre;
        this.entorno = entorno;
    }
    TablaSimbolos.prototype.setEntorno = function (entorno) {
        this.entorno = entorno;
    };
    TablaSimbolos.prototype.setValor = function (valor) {
        this.simbolos.valor = valor;
    };
    TablaSimbolos.prototype.agregar = function (simbolo) {
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        this.simbolos.push(simbolo);
    };
    TablaSimbolos.prototype.setSimbolo = function (identificador, valor, tipo, alcance, tipoEtiqueta) {
        var NuevoSimbolo = Simbolo(identificador, valor, tipo, alcance, tipoEtiqueta);
        this.simbolos.push(NuevoSimbolo);
    };
    TablaSimbolos.prototype.setHijo = function (hijo) {
        this.simbolos.push(hijo);
    };
    TablaSimbolos.prototype.getSimbolo = function (identificador) {
        var simbolo = this.simbolos.filter(function (simbolo) { return simbolo.identificador === identificador; })[0];
        if (simbolo)
            return simbolo;
        else
            return "ERROR";
    };
    TablaSimbolos.prototype.getAlcance = function () {
        return this.entorno;
    };
    return TablaSimbolos;
}());
