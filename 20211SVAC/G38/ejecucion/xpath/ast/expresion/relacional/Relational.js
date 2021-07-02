"use strict";
class Relational extends ExpresionAncestor {
    constructor(izquierdo, derecha, relationalOperator, linea, columna) {
        super();
        this.izquierdo = izquierdo;
        this.derecha = derecha;
        this.relationalOperator = relationalOperator;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierdo.getTipo(tsXquery, ent);
        let tipoDerecha = this.derecha.getTipo(tsXquery, ent);
        if ((tipoIzquierda.esXpath() || tipoIzquierda.esNumero()) && (tipoDerecha.esXpath() || tipoDerecha.esNumero())) {
            tipo = new Tipo(TipoDato.booleano);
        }
        else if (!tipoIzquierda.esError() && !tipoDerecha.esError()) {
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos(this.relationalOperator, tipoIzquierda, tipoDerecha, this.linea, this.columna));
        }
        return tipo;
    }
    getValor(tsXquery, ent) {
        let valor;
        let tipo = this.getTipo(tsXquery, ent);
        let valorIzquierda = this.izquierdo.getValor(tsXquery, ent);
        let valorDerecha = this.derecha.getValor(tsXquery, ent);
        if (valorIzquierda instanceof TablaSimbolos) {
            valorIzquierda = valorIzquierda.getContentRow();
            if (valorIzquierda != null) {
                if (valorIzquierda.getTipo(ent).esNumero())
                    valorIzquierda = valorIzquierda.getValor(ent);
                else {
                    //error de tipo
                    ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                    valorIzquierda = null;
                }
            }
            else {
                //error
                ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("No se puede realizar la operacion relacional con mas de un ninguno o mas de un objeto xpath  ", this.linea, this.columna));
                valorIzquierda = null;
            }
        }
        if (valorDerecha instanceof TablaSimbolos) {
            valorDerecha = valorDerecha.getContentRow();
            if (valorDerecha != null) {
                if (valorDerecha.getTipo(ent).esNumero())
                    valorDerecha = valorDerecha.getValor(ent);
                else {
                    //error de tipo
                    ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                    valorDerecha = null;
                }
            }
            else {
                //error
                ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("No se puede realizar la operacion relacional con mas de un ninguno o mas de un objeto xpath  ", this.linea, this.columna));
                valorDerecha = null;
            }
        }
        if (!tipo.esError() && valorIzquierda != null && valorDerecha != null) {
            switch (this.relationalOperator) {
                case RelationalOperators.greaterThan:
                    valor = valorIzquierda > valorDerecha;
                    break;
                case RelationalOperators.greaterOrEqualThan:
                    valor = valorIzquierda >= valorDerecha;
                    break;
                case RelationalOperators.lessThan:
                    valor = valorIzquierda < valorDerecha;
                    break;
                case RelationalOperators.lessOrEqualThan:
                    valor = valorIzquierda <= valorDerecha;
                    break;
            }
        }
        return valor;
    }
}
