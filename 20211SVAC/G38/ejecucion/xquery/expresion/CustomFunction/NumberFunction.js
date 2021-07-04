"use strict";
class NumberFunction {
    constructor(entrada, linea, columna) {
        this.entrada = entrada;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, xmlData) {
        let tipo = this.entrada.getTipo(ent, xmlData);
        if (tipo.esPrimitivo())
            return new Tipo(TipoDato.numero);
        else
            return new Tipo(TipoDato.err);
    }
    getValor(ent, xmlData) {
        let tipo = this.getTipo(ent, xmlData);
        if (tipo.esPrimitivo()) {
            let valor = this.entrada.getValor(ent, xmlData);
            let conversion = Number(valor);
            if (!isNaN(conversion)) {
                return conversion;
            }
            else {
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede convertir en numero el valor " + valor.toString(), this.linea, this.columna));
            }
        }
        else {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se puede convertir en numero el tipo " + tipo.toString(), this.linea, this.columna));
        }
        return null;
    }
}
