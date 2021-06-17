"use strict";
class AndLogica {
    constructor(izquierdo, derecha, linea, columna) {
        this.izquierdo = izquierdo;
        this.derecha = derecha;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierdo.getTipo(ent);
        let tipoDerecha = this.derecha.getTipo(ent);
        if (tipoIzquierda.esBoolean() && tipoDerecha.esBoolean()) {
            tipo = new Tipo(TipoDato.booleano);
        }
        else if (!tipoIzquierda.esError() && !tipoDerecha.esError()) {
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos("And(&&)", tipoIzquierda, tipoDerecha, this.linea, this.columna));
        }
        return tipo;
    }
    getValor(ent) {
        let tipo = this.getTipo(ent);
        let valor;
        if (!tipo.esError()) {
            valor = this.izquierdo.getValor(ent) && this.derecha.getValor(ent);
        }
        return valor;
    }
}
