"use strict";
class XqueryList {
    constructor(xqueryInstruccions) {
        this.xqueryInstruccions = xqueryInstruccions;
    }
    ejecutar(ent, xmlData) {
        this.xqueryInstruccions.forEach(function (instruccion) {
            try {
                instruccion.ejecutar(ent, xmlData);
            }
            catch (exception) {
                if (exception instanceof ReturnException) {
                    InterfazGrafica.print(XpathUtil.convertirXqueryAString(exception.valor));
                }
            }
        });
    }
}
