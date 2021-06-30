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
    createSimbolo(valor, tipo, ent, xmlData) {
        if (valor != null && valor != undefined) {
            let simbolo;
            if (valor instanceof Primitive)
                simbolo = new Simbolo(this.variable, tipo, valor.getValor(ent, xmlData), null);
            else if (valor instanceof TablaSimbolos)
                simbolo = new Simbolo(this.variable, tipo, null, valor);
            else
                simbolo = new Simbolo(this.variable, tipo, valor, null);
            if (!ent.agregarSimbolo(simbolo)) {
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se pudo guardar la variable con nombre " + this.variable
                    + " porque ya ha sido declarada", this.linea, this.columna));
            }
        }
    }
}
