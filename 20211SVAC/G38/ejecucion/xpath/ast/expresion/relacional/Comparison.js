"use strict";
class Comparison extends ExpresionAncestor {
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
        if (tipoIzquierda.esNumero() && tipoDerecha.esNumero()) {
            tipo = new Tipo(TipoDato.booleano);
        }
        else if (tipoIzquierda.esCadena() && tipoDerecha.esCadena()) {
            tipo = new Tipo(TipoDato.booleano);
        }
        else if (tipoIzquierda.esXpath() || tipoDerecha.esXpath()) {
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
            valorIzquierda = PredicateExpresion.getPrimitiveOfAtributeOrObject(valorIzquierda);
            if (valorIzquierda != null) {
                if (valorIzquierda.getTipo(ent).esNumero() || valorIzquierda.getTipo(ent).esCadena())
                    valorIzquierda = valorIzquierda.getValor(ent);
                else {
                    ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                    valorIzquierda = null;
                }
            }
            else {
                ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                valorIzquierda = null;
            }
        }
        if (valorDerecha instanceof TablaSimbolos) {
            valorDerecha = PredicateExpresion.getPrimitiveOfAtributeOrObject(valorDerecha);
            if (valorDerecha != null) {
                if (valorDerecha.getTipo(ent).esNumero() || valorDerecha.getTipo(ent).esCadena())
                    valorDerecha = valorDerecha.getValor(ent);
                else {
                    ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                    valorDerecha = null;
                }
            }
            else {
                ListaErrores.AgregarErrorXPATH(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                valorDerecha = null;
            }
        }
        if (!tipo.esError() && valorIzquierda != null && valorDerecha != null) {
            switch (this.relationalOperator) {
                case RelationalOperators.equal:
                    valor = valorIzquierda == valorDerecha;
                    break;
                case RelationalOperators.notEqual:
                    valor = valorIzquierda != valorDerecha;
                    break;
            }
        }
        return valor;
    }
}
