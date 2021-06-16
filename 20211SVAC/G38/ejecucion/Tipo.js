"use strict";
var TipoDato;
(function (TipoDato) {
    TipoDato["objeto"] = "Objeto";
    TipoDato["atributo"] = "Atributo";
    TipoDato["cadena"] = "Cadena";
    TipoDato["numero"] = "Numero";
    TipoDato["booleano"] = "Booleano";
    TipoDato["err"] = "Error";
    TipoDato["global"] = "Global";
    TipoDato["xpathValue"] = "Xpath Query";
})(TipoDato || (TipoDato = {}));
class Tipo {
    constructor(tipoDato) {
        this.tipoDato = tipoDato;
    }
    toString() {
        return this.tipoDato.toString();
    }
    esBoolean() {
        return this.tipoDato == TipoDato.booleano;
    }
    esNumero() {
        return this.tipoDato == TipoDato.numero;
    }
    esCadena() {
        return this.tipoDato == TipoDato.cadena;
    }
    esAtributo() {
        return this.tipoDato == TipoDato.atributo;
    }
    esObjeto() {
        return this.tipoDato == TipoDato.objeto;
    }
    esError() {
        return this.tipoDato == TipoDato.err;
    }
    esPrimitivo() {
        return this.tipoDato == TipoDato.cadena || this.tipoDato == TipoDato.numero || this.tipoDato == TipoDato.booleano;
    }
    esXpath() {
        return this.tipoDato == TipoDato.xpathValue;
    }
    esGlobal() {
        return this.tipoDato == TipoDato.global;
    }
}
