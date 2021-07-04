"use strict";
class StringFunction {
    constructor(entrada, linea, columna) {
        this.entrada = entrada;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, xmlData) {
        let tipo = this.entrada.getTipo(ent, xmlData);
        if (tipo.esPrimitivo())
            return new Tipo(TipoDato.cadena);
        else
            return new Tipo(TipoDato.err);
    }
    getValor(ent, xmlData) {
        let tipo = this.getTipo(ent, xmlData);
        if (tipo.esPrimitivo()) {
            let valor = this.entrada.getValor(ent, xmlData);
            let conversion = String(valor);
            return conversion;
        }
        else {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede convertir en cadena el tipo " + tipo.toString(), this.linea, this.columna));
        }
        return null;
    }
}
