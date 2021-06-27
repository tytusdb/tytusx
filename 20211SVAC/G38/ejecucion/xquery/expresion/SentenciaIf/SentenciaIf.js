"use strict";
class SentenciaIf {
    constructor(condicion, sentencias, linea, columna) {
        this.condicion = condicion;
        this.sentencias = sentencias;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let tipo = this.condicion.getTipo(ent, xmlData);
        if (tipo != null && tipo != undefined && tipo.esBoolean()) {
            let valor = this.condicion.getValor(ent, xmlData);
            if (valor) {
                let entornoIf = new TablaSimbolosXquery(ent, "entorno if");
                for (let sentencia of this.sentencias) {
                    sentencia.ejecutar(entornoIf, xmlData);
                }
                return true;
            }
        }
        return false;
    }
}
