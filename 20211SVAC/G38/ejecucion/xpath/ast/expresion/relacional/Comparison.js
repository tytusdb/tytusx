"use strict";
class Comparison {
    constructor(izquierdo, derecha, relationalOperator, linea, columna) {
        this.izquierdo = izquierdo;
        this.derecha = derecha;
        this.relationalOperator = relationalOperator;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierdo.getTipo(ent);
        let tipoDerecha = this.derecha.getTipo(ent);
        if (tipoIzquierda.esNumero() && tipoDerecha.esNumero()) {
            tipo = new Tipo(TipoDato.numero);
        }
        else if (tipoIzquierda.esCadena() && tipoDerecha.esCadena()) {
            tipo = new Tipo(TipoDato.cadena);
        }
        else if (tipoIzquierda.esXpath() || tipoIzquierda.esXpath()) {
            tipo = new Tipo(TipoDato.xpathValue);
        }
        else if (!tipoIzquierda.esError() && !tipoDerecha.esError()) {
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos(this.relationalOperator, tipoIzquierda, tipoDerecha, this.linea, this.columna));
        }
        return tipo;
    }
    getValor(ent) {
        switch (this.relationalOperator) {
            case RelationalOperators.equal:
                break;
            case RelationalOperators.notEqual:
                break;
        }
    }
}
