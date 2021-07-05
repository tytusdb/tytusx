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
        else if (tipoIzquierda.esBoolean() && tipoDerecha.esBoolean()) {
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
            valorIzquierda = PredicateExpresion.getPrimitiveOfAtributeOrObject(valorIzquierda);
            if (valorIzquierda != null) {
                if (valorIzquierda.getTipo(ent).esNumero() || valorIzquierda.getTipo(ent).esCadena())
                    valorIzquierda = valorIzquierda.getValor(ent);
                else {
                    ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                    valorIzquierda = null;
                }
            }
            else {
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                valorIzquierda = null;
            }
        }
        if (valorDerecha instanceof TablaSimbolos) {
            valorDerecha = PredicateExpresion.getPrimitiveOfAtributeOrObject(valorDerecha);
            if (valorDerecha != null) {
                if (valorDerecha.getTipo(ent).esNumero() || valorDerecha.getTipo(ent).esCadena())
                    valorDerecha = valorDerecha.getValor(ent);
                else {
                    ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                    valorDerecha = null;
                }
            }
            else {
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El tipo de valor de la ruta xpath no es compatible para la operacion relacional  " + this.relationalOperator, this.linea, this.columna));
                valorDerecha = null;
            }
        }
        if (!tipo.esError() && valorIzquierda != null && valorDerecha != null) {
            switch (this.relationalOperator) {
                case RelationalOperators.equal:
                case RelationalOperators.one_equal:
                    valor = valorIzquierda == valorDerecha;
                    break;
                case RelationalOperators.notEqual:
                case RelationalOperators.one_notEqual:
                    valor = valorIzquierda != valorDerecha;
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
                case RelationalOperators.equal:
                case RelationalOperators.one_equal:
                    cadena = "if(" + resultadoIzq.idResultado + " == " + resultadoDer.idResultado + ") goto " + etqV + ";";
                    break;
                case RelationalOperators.notEqual:
                case RelationalOperators.one_notEqual:
                    cadena = "if(" + resultadoIzq.idResultado + " != " + resultadoDer.idResultado + ") goto " + etqV + ";";
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
