"use strict";
class AndLogica extends ExpresionAncestor {
    constructor(izquierdo, derecha, linea, columna) {
        super();
        this.izquierdo = izquierdo;
        this.derecha = derecha;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierdo.getTipo(tsXquery, ent);
        let tipoDerecha = this.derecha.getTipo(tsXquery, ent);
        if (tipoIzquierda.esBoolean() && tipoDerecha.esBoolean()) {
            tipo = new Tipo(TipoDato.booleano);
        }
        else if (!tipoIzquierda.esError() && !tipoDerecha.esError()) {
            ListaErrores.AgregarErrorXQUERY(CrearError.tiposInvalidos("And(&&)", tipoIzquierda, tipoDerecha, this.linea, this.columna));
        }
        return tipo;
    }
    getValor(tsXquery, ent) {
        let tipo = this.getTipo(tsXquery, ent);
        let valor;
        if (!tipo.esError()) {
            valor = this.izquierdo.getValor(tsXquery, ent) && this.derecha.getValor(tsXquery, ent);
        }
        return valor;
    }
    traducir3DXQuery(sizeScope) {
        let salida = new ExpresionC3D(null);
        let etqV;
        let etqF;
        let resultadoIzq = this.izquierdo.traducir3DXQuery(sizeScope);
        if (resultadoIzq != null &&
            resultadoIzq instanceof ExpresionC3D) {
            etqF = resultadoIzq.etiquetasFalsas;
            CodeUtil.printWithComment(resultadoIzq.imprimirVerdaderas() + ":", "Salto condicional and logica");
        }
        else {
            return null;
        }
        let resultadoDer = this.derecha.traducir3DXQuery(sizeScope);
        if (resultadoDer != null &&
            resultadoDer instanceof ExpresionC3D) {
            etqF = etqF.concat(resultadoDer.etiquetasFalsas);
            etqV = resultadoDer.etiquetasVerdaderas;
        }
        else {
            return null;
        }
        salida.etiquetasVerdaderas = etqV;
        salida.etiquetasFalsas = etqF;
        return salida;
    }
}
