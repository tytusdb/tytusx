"use strict";
class PredicateExpresion {
    static filterXpathExpresion(ent, listaPredicados) {
        let tablaFiltrada = XpathUtil.crearTablaSimbolos(ent.listaSimbolos.filter(function (simbolo) {
            // let filtro = true;
            for (let predicado of listaPredicados) {
                let expresion = predicado.getValor(XpathUtil.crearTablaSimbolos([simbolo]));
                if (expresion instanceof Primitive) {
                    if (expresion.getTipo(ent).esNumero()) {
                        if (!(simbolo.indice == expresion.getValor(ent))) {
                            return false;
                        }
                    }
                    else if (!expresion.getTipo(ent).esBoolean()) {
                        return false;
                    }
                }
                if (typeof expresion == "number") {
                    if (!(simbolo.indice == expresion)) {
                        return false;
                    }
                }
                if (expresion instanceof TablaSimbolos) {
                    if (expresion.esVacia()) {
                        return false;
                    }
                }
            }
            return true;
        }));
        return tablaFiltrada;
    }
}
