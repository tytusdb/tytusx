"use strict";
class DataFunction extends ExpresionAncestor {
    constructor(expresion, linea, columna) {
        super();
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, xmlData) {
        let tipo = this.expresion.getTipo(ent, xmlData);
        if (tipo.esXpath())
            return new Tipo(TipoDato.xpathValue);
        else
            return new Tipo(TipoDato.err);
    }
    getValor(ent, xmlData) {
        let tipo = this.getTipo(ent, xmlData);
        if (tipo.esXpath()) {
            let valor = this.expresion.getValor(ent, xmlData);
            if (valor instanceof TablaSimbolos) {
                return valor.findAllSubTextInTS();
            }
            else {
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede utilizar la funcion data para una expresion diferente a xquery", this.linea, this.columna));
            }
        }
        else {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede utilizar la funcion data para una expresion diferente a xquery", this.linea, this.columna));
        }
        return null;
    }
}
