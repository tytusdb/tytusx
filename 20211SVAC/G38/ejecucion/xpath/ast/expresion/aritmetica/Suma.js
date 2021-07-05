"use strict";
class Suma extends ExpresionAncestor {
    constructor(izquierda, derecha, linea, columna) {
        super();
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(tsXquery, ent) {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierda.getTipo(tsXquery, ent);
        let tipoDerecha = this.derecha.getTipo(tsXquery, ent);
        if (tipoIzquierda.esNumero() && tipoDerecha.esNumero()) {
            tipo = new Tipo(TipoDato.numero);
        }
        else if (tipoIzquierda.esCadena() && tipoDerecha.esCadena()) {
            tipo = new Tipo(TipoDato.cadena);
        }
        else if (!tipoIzquierda.esError() && !tipoDerecha.esError()) {
            ListaErrores.AgregarErrorXQUERY(CrearError.tiposInvalidos("Suma", tipoIzquierda, tipoDerecha, this.linea, this.columna));
        }
        return tipo;
    }
    getValor(tsXquery, ent) {
        let tipo = this.getTipo(tsXquery, ent);
        let valor;
        if (!tipo.esError()) {
            valor = this.izquierda.getValor(tsXquery, ent) + this.derecha.getValor(tsXquery, ent);
        }
        return valor;
    }
    traducir3DXQuery(sizeScope) {
        let resultadoIzq = this.izquierda.traducir3DXQuery(sizeScope);
        let resultadoDer = this.derecha.traducir3DXQuery(sizeScope);
        if (resultadoIzq != null && resultadoDer != null &&
            resultadoIzq instanceof ExpresionC3D && resultadoDer instanceof ExpresionC3D) {
            let idResultado = CodeUtil.generarTemporal();
            let cadena = idResultado + " = " + resultadoIzq.idResultado + " + " + resultadoDer.idResultado + ";";
            CodeUtil.printWithComment(cadena, "operacion aritmetica de suma ");
            return new ExpresionC3D(idResultado);
        }
        return null;
    }
}
