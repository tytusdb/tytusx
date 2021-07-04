"use strict";
class FilterResult {
    constructor(variable, filterExpresion, linea, columna) {
        this.variable = variable;
        this.filterExpresion = filterExpresion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let simbolo = ent.obtenerSimbolo(this.variable);
        if (simbolo == null || !simbolo.tipo.esXpath()) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se encontro la variable " + this.variable + "en el entorno actual", this.linea, this.columna));
            return;
        }
        return PredicateExpresion.filterXpathXqueryExpresion(ent, simbolo.valorXpath, [this.filterExpresion]);
    }
}
