"use strict";
class Asignacion {
    constructor(variable, expresion, linea, columna) {
        this.variable = variable;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let simbolo = ent.obtenerSimbolo(this.variable);
        if (simbolo == null) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se encontro la variable " + this.variable
                + " en la tabla de simbolos", this.linea, this.columna));
            return;
        }
        let tipo = this.expresion.getTipo(ent, xmlData);
        let valor = this.expresion.getValor(ent, xmlData);
        if (tipo.esXpath()) {
            let primitivo = XpathUtil.obtenerPrimitivoFromXpath(valor);
            if (primitivo != null && primitivo != undefined) {
                tipo = primitivo.getTipo(null, null);
                valor = primitivo.getValor(null, null);
            }
        }
        if (!simbolo.tipo.esEquivalente(tipo)) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El tipo de dato en la tabla de simbolos Tipo: " + simbolo.tipo.toString()
                + " no es equivalente al tipo de la expresion Tipo: " + tipo.toString(), this.linea, this.columna));
            return;
        }
        this.modifySimbolo(valor, tipo, ent, xmlData);
    }
    modifySimbolo(valor, tipo, ent, xmlData) {
        if (valor != null && valor != undefined) {
            let simbolo;
            if (valor instanceof Primitive)
                simbolo = new Simbolo(this.variable, tipo, valor.getValor(ent, xmlData), null);
            else if (valor instanceof TablaSimbolos)
                simbolo = new Simbolo(this.variable, tipo, null, valor);
            else
                simbolo = new Simbolo(this.variable, tipo, valor, null);
            if (!ent.modificarSimbolo(simbolo)) {
                ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se pudo modificar el simbolo " + this.variable
                    + " porque no ha sido declarado", this.linea, this.columna));
            }
        }
    }
    traducirXQ(sizeScope, otro) {
        throw new Error("Method not implemented.");
    }
}
