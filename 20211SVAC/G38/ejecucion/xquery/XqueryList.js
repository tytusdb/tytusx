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
    obtenerTS(xmlData) {
        let ts = new TablaSimbolosXquery(null, "GLOBAL");
        this.xqueryInstruccions.forEach(function (instruccion) {
            try {
                if (instruccion instanceof Declaracion) {
                    instruccion.ejecutar(ts, xmlData);
                }
            }
            catch (exception) {
                if (exception instanceof ReturnException) {
                    InterfazGrafica.print(XpathUtil.convertirXqueryAString(exception.valor));
                }
            }
        });
        return ts;
    }
    traducirXQ(sizeScope, otro) {
        if (this.xqueryInstruccions == null || this.xqueryInstruccions.length == 0) {
            return;
        }
        for (let instruction of this.xqueryInstruccions) {
            try {
                instruction.traducirXQ(sizeScope, otro);
            }
            catch (tokenError) {
                if (tokenError instanceof TokenError) {
                    ListaErrores.AgregarErrorC3D(tokenError);
                }
            }
        }
    }
}
