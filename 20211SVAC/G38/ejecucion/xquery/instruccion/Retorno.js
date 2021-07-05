"use strict";
class Retorno {
    constructor(expresion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let val = this.expresion.getValor(ent, xmlData);
        if (val == null || val == undefined) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("Error en la ejecucion de la expresion de retorno", this.linea, this.columna));
        }
        else {
            throw new ReturnException(val);
        }
    }
    traducirXQ(sizeScope, otro) {
        this.expresion.traducirRetorno3DXQuery(sizeScope, otro);
    }
}
