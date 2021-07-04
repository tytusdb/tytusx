"use strict";
class Declaracion {
    constructor(variable, expresion, linea, columna) {
        this.variable = variable;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let tipo = this.expresion.getTipo(ent, xmlData);
        let valor;
        if (!tipo.esError()) {
            valor = this.expresion.getValor(ent, xmlData);
            if (tipo.esXpath()) {
                let primitivo = XpathUtil.obtenerPrimitivoFromXpath(valor);
                if (primitivo != null && primitivo != undefined) {
                    tipo = primitivo.getTipo(null, null);
                    valor = primitivo.getValor(null, null);
                }
            }
            if (!XpathUtil.createSimbolo(this.variable, valor, tipo, ent, xmlData)) {
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se pudo guardar la variable con nombre " + this.variable
                    + " porque ya ha sido declarada", this.linea, this.columna));
            }
        }
        else {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se pudo guardar la variable con nombre " + this.variable
                + " porque la expresion es invalida", this.linea, this.columna));
        }
    }
}
