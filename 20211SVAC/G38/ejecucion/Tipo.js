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
    TipoDato["primitivoNumerico"] = "Primitivo Numerico";
})(TipoDato || (TipoDato = {}));
var TipoDato3D;
(function (TipoDato3D) {
    TipoDato3D[TipoDato3D["objeto"] = -5] = "objeto";
    TipoDato3D[TipoDato3D["atributo"] = -10] = "atributo";
    TipoDato3D[TipoDato3D["cadena"] = -20] = "cadena";
    TipoDato3D[TipoDato3D["numero"] = -30] = "numero";
    TipoDato3D[TipoDato3D["booleano"] = -40] = "booleano";
    TipoDato3D[TipoDato3D["err"] = 5] = "err";
    TipoDato3D[TipoDato3D["global"] = 6] = "global";
    TipoDato3D[TipoDato3D["xpathValue"] = 7] = "xpathValue";
    TipoDato3D[TipoDato3D["primitivoNumerico"] = -50] = "primitivoNumerico";
})(TipoDato3D || (TipoDato3D = {}));
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
    equals(tipo) {
        return this.tipoDato == tipo.tipoDato;
    }
    esEquivalente(tipo) {
        let esEquivalente = false;
        if (this.esBoolean() && tipo.esBoolean())
            esEquivalente = true;
        else if (this.esNumero() && (tipo.esNumero() || tipo.esBoolean()))
            esEquivalente = true;
        else if (this.esCadena() && (tipo.esCadena() || tipo.esNumero() || tipo.esBoolean()))
            esEquivalente = true;
        else if (this.tipoDato == tipo.tipoDato)
            esEquivalente = true;
        return esEquivalente;
    }
    getTipo() {
        switch (this.tipoDato) {
            case TipoDato.objeto:
                return TipoDato3D.objeto;
            case TipoDato.atributo:
                return TipoDato3D.atributo;
            case TipoDato.cadena:
                return TipoDato3D.cadena;
            case TipoDato.booleano:
                return TipoDato3D.booleano;
            case TipoDato.numero:
                return TipoDato3D.numero;
            case TipoDato.err:
                return TipoDato3D.err;
            case TipoDato.global:
                return TipoDato3D.global;
            case TipoDato.xpathValue:
                return TipoDato3D.xpathValue;
            case TipoDato.primitivoNumerico:
                return TipoDato3D.primitivoNumerico;
            default:
                throw new Error("Tipo de dato no reconocido: " + this.tipoDato);
        }
    }
}
