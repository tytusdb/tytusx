"use strict";
class SentenciaIf {
    constructor(condicion, sentencia, linea, columna) {
        this.condicion = condicion;
        this.sentencias = sentencia;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let tipo = this.condicion.getTipo(ent, xmlData);
        if (tipo != null && tipo != undefined && tipo.esBoolean()) {
            let valor = this.condicion.getValor(ent, xmlData);
            if (valor) {
                let entornoIf = new TablaSimbolosXquery(ent, "entorno if");
                let valor = this.sentencias.getValor(entornoIf, xmlData);
                if (valor != null && valor != undefined) {
                    throw new ReturnException(valor);
                }
                return true;
            }
        }
        return false;
    }
}
