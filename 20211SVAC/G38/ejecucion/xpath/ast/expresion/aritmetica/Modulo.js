"use strict";
class Modulo {
    constructor(izquierda, derecha, linea, columna) {
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        let tipo = new Tipo(TipoDato.err);
        let tipoIzquierda = this.izquierda.getTipo(ent);
        let tipoDerecha = this.derecha.getTipo(ent);
        if (tipoIzquierda.esNumero() && tipoDerecha.esNumero()) {
            tipo = new Tipo(TipoDato.numero);
        }
        else if (!tipoIzquierda.esError() && !tipoDerecha.esError()) {
            ListaErrores.AgregarErrorXPATH(CrearError.tiposInvalidos("Modulo", tipoIzquierda, tipoDerecha, this.linea, this.columna));
        }
        return tipo;
    }
    getValor(ent) {
        return null;
    }
}
