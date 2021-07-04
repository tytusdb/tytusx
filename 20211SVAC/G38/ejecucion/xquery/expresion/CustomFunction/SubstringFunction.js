"use strict";
class SubstringFunction extends ExpresionAncestor {
    constructor(cadena, inicio, fin, linea, columna) {
        super();
        this.cadena = cadena;
        this.inicio = inicio;
        this.fin = fin;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, xmlData) {
        let tipo = this.cadena.getTipo(ent, xmlData);
        if (tipo.esCadena())
            return new Tipo(TipoDato.cadena);
        else
            return new Tipo(TipoDato.err);
    }
    getValor(ent, xmlData) {
        let tipo = this.getTipo(ent, xmlData);
        if (tipo.esCadena()) {
            if (this.fin != null) {
                let tipoInicio = this.inicio.getTipo(ent, xmlData);
                let tipoFin = this.fin.getTipo(ent, xmlData);
                if (tipoInicio.esNumero() && tipoFin.esNumero()) {
                    let valorInicial = this.inicio.getValor(ent, xmlData);
                    let valorFinal = this.fin.getValor(ent, xmlData);
                    let cadena = this.cadena.getValor(ent, xmlData);
                    return cadena.substring(valorInicial, valorFinal);
                }
                else {
                    ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("Los valores de inicio y fin no son de tipo numerico ", this.linea, this.columna));
                }
            }
            else {
                let tipoInicio = this.inicio.getTipo(ent, xmlData);
                if (tipoInicio.esNumero()) {
                    let valorInicial = this.inicio.getValor(ent, xmlData);
                    let cadena = this.cadena.getValor(ent, xmlData);
                    return cadena.substring(valorInicial, cadena.length);
                }
                else {
                    ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El valor de inicio no es de tipo numerico ", this.linea, this.columna));
                }
            }
        }
        else {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede aplicar substring a el tipo " + tipo.toString(), this.linea, this.columna));
        }
        return null;
    }
}
