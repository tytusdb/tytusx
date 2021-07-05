"use strict";
class PredicateExpresion {
    static filterXpathExpresion(ent, listaPredicados) {
        return PredicateExpresion.filterXpathXqueryExpresion(null, ent, listaPredicados);
    }
    static filterXpathXqueryExpresion(xqueryEnt, ent, listaPredicados) {
        let ultimaPosicion = ent.getLastPosition();
        let tablaFiltrada = XpathUtil.crearTablaSimbolos(ent.listaSimbolos.filter(function (simbolo) {
            for (let predicado of listaPredicados) {
                let expresion = predicado.getValor(xqueryEnt, XpathUtil.crearTablaSimbolosAndSetLastPosition([simbolo], ultimaPosicion));
                return PredicateExpresion.validatePredicateExpresion(expresion, simbolo, xqueryEnt, ent);
            }
            return true;
        }));
        return tablaFiltrada;
    }
    static validatePredicateExpresion(predicateExpresion, simbolo, xqueryEnt, ent) {
        if (predicateExpresion instanceof Primitive) {
            if (predicateExpresion.getTipo(xqueryEnt, ent).esNumero()) {
                if (!(simbolo.indice == predicateExpresion.getValor(xqueryEnt, ent))) {
                    return false;
                }
            }
            else if (predicateExpresion.getTipo(xqueryEnt, ent).esBoolean()) {
                return predicateExpresion.getValor(xqueryEnt, ent);
            }
            else if (!predicateExpresion.getTipo(xqueryEnt, ent).esBoolean()) {
                return false;
            }
        }
        if (typeof predicateExpresion == "number") {
            if (!(simbolo.indice == predicateExpresion)) {
                return false;
            }
        }
        else if (typeof predicateExpresion == "boolean") {
            return predicateExpresion;
        }
        else if (predicateExpresion instanceof TablaSimbolos) {
            if (predicateExpresion.esVacia()) {
                return false;
            }
        }
        else if (predicateExpresion == null || predicateExpresion == undefined) {
            return false;
        }
        return true;
    }
    static getPrimitiveOfAtributeOrObject(tablaSimbolos) {
        let valor = null;
        if (tablaSimbolos instanceof TablaSimbolos) {
            valor = tablaSimbolos.getContentRow();
        }
        return valor;
    }
    static isPrimitiveNumber(valor) {
        return valor.getTipo(null, XpathUtil.crearTablaSimbolos([])).esNumero();
    }
}
