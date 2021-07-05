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
            ListaErrores.AgregarErrorXQUERY(CrearError.tiposInvalidos(this.relationalOperator, tipoIzquierda, tipoDerecha, this.linea, this.columna));
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
                if (valorIzquierda.getTipo(tsXquery, ent).esNumero())
                    valorIzquierda = valorIzquierda.getValor(tsXquery, ent);
                else {
                    //error de tipo
                    ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                    valorIzquierda = null;
                }
            }
            else {
                //error
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede realizar la operacion relacional con mas de un ninguno o mas de un objeto xpath  ", this.linea, this.columna));
                valorIzquierda = null;
            }
        }
        if (valorDerecha instanceof TablaSimbolos) {
            valorDerecha = valorDerecha.getContentRow();
            if (valorDerecha != null) {
                if (valorDerecha.getTipo(tsXquery, ent).esNumero())
                    valorDerecha = valorDerecha.getValor(tsXquery, ent);
                else {
                    //error de tipo
                    ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                    valorDerecha = null;
                }
            }
            else {
                //error
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede realizar la operacion relacional con mas de un ninguno o mas de un objeto xpath  ", this.linea, this.columna));
                valorDerecha = null;
            }
        }
        if (!tipo.esError() && valorIzquierda != null && valorDerecha != null) {
            switch (this.relationalOperator) {
                case RelationalOperators.greaterThan:
                case RelationalOperators.one_greaterThan:
                    valor = valorIzquierda > valorDerecha;
                    break;
                case RelationalOperators.greaterOrEqualThan:
                case RelationalOperators.one_greaterOrEqualThan:
                    valor = valorIzquierda >= valorDerecha;
                    break;
                case RelationalOperators.lessThan:
                case RelationalOperators.one_lessThan:
                    valor = valorIzquierda < valorDerecha;
                    break;
                case RelationalOperators.lessOrEqualThan:
                case RelationalOperators.one_lessOrEqualThan:
                    valor = valorIzquierda <= valorDerecha;
                    break;
            }
        }
        return valor;
    }
    traducir3DXQuery(sizeScope) {
        let resultadoIzq = this.izquierdo.traducir3DXQuery(sizeScope);
        let resultadoDer = this.derecha.traducir3DXQuery(sizeScope);
        if (resultadoIzq != null && resultadoDer != null &&
            resultadoIzq instanceof ExpresionC3D && resultadoDer instanceof ExpresionC3D) {
            let salida = new ExpresionC3D(null);
            let etqV = CodeUtil.generarEtiqueta();
            let etqF = CodeUtil.generarEtiqueta();
            let cadena = "";
            switch (this.relationalOperator) {
                case RelationalOperators.greaterThan:
                case RelationalOperators.one_greaterThan:
                    cadena = "if(" + resultadoIzq.idResultado + " > " + resultadoDer.idResultado + ") goto " + etqV + ";";
                    break;
                case RelationalOperators.greaterOrEqualThan:
                case RelationalOperators.one_greaterOrEqualThan:
                    cadena = "if(" + resultadoIzq.idResultado + " >= " + resultadoDer.idResultado + ") goto " + etqV + ";";
                    break;
                case RelationalOperators.lessThan:
                case RelationalOperators.one_lessThan:
                    cadena = "if(" + resultadoIzq.idResultado + " < " + resultadoDer.idResultado + ") goto " + etqV + ";";
                    break;
                case RelationalOperators.lessOrEqualThan:
                case RelationalOperators.one_lessOrEqualThan:
                    cadena = "if(" + resultadoIzq.idResultado + " <= " + resultadoDer.idResultado + ") goto " + etqV + ";";
                    break;
            }
            CodeUtil.printWithComment(cadena, "Generacion expresion relacional");
            CodeUtil.printWithComment("goto " + etqF + ";", "Salto relacional");
            salida.etiquetasVerdaderas.push(etqV);
            salida.etiquetasFalsas.push(etqF);
            return salida;
        }
        return null;
    }
}
