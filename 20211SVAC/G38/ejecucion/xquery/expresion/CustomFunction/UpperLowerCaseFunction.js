"use strict";
class UpperLowerCaseFunction extends ExpresionAncestor {
    constructor(entrada, upperCase, linea, columna) {
        super();
        this.entrada = entrada;
        this.upperCase = upperCase;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, xmlData) {
        let tipo = this.entrada.getTipo(ent, xmlData);
        if (tipo.esCadena())
            return new Tipo(TipoDato.cadena);
        else
            return new Tipo(TipoDato.err);
    }
    getValor(ent, xmlData) {
        let tipo = this.getTipo(ent, xmlData);
        if (tipo.esCadena()) {
            let valor = this.entrada.getValor(ent, xmlData);
            if (this.upperCase)
                return valor.toUpperCase();
            else
                return valor.toLowerCase();
        }
        else {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se pueden usar las funciones de UPPER/LOWER CASE con el tipo de dato " + tipo.toString(), this.linea, this.columna));
        }
        return null;
    }
}
