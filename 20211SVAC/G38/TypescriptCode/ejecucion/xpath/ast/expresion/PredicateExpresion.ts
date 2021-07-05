class PredicateExpresion {

    static filterXpathExpresion(ent: TablaSimbolos, listaPredicados: Expresion[]):TablaSimbolos {
        return PredicateExpresion.filterXpathXqueryExpresion(null,ent,listaPredicados);
    }
    static filterXpathXqueryExpresion(xqueryEnt: TablaSimbolosXquery,ent: TablaSimbolos, listaPredicados: Expresion[]):TablaSimbolos{
        let ultimaPosicion = ent.getLastPosition();
        let tablaFiltrada = XpathUtil.crearTablaSimbolos(
            ent.listaSimbolos.filter(function (simbolo) {
                for(let predicado of listaPredicados){
                    let expresion =
                        predicado.getValor(xqueryEnt,XpathUtil.crearTablaSimbolosAndSetLastPosition([simbolo],ultimaPosicion));
                    return PredicateExpresion.validatePredicateExpresion(expresion, simbolo, xqueryEnt, ent);
                }
                return true;
            })
        );
        return tablaFiltrada;
    }

    static validatePredicateExpresion(predicateExpresion:any,simbolo:TsRow,xqueryEnt:TablaSimbolosXquery,ent:TablaSimbolos):boolean{
        if(predicateExpresion instanceof Primitive) {
            if (predicateExpresion.getTipo(xqueryEnt,ent).esNumero()) {
                if (!(simbolo.indice == predicateExpresion.getValor(xqueryEnt,ent))) {
                    return false;
                }
            } else if (predicateExpresion.getTipo(xqueryEnt,ent).esBoolean()) {
                return predicateExpresion.getValor(xqueryEnt,ent);
            }else if (!predicateExpresion.getTipo(xqueryEnt,ent).esBoolean()) {
                return false;
            }
        }
        if (typeof predicateExpresion == "number") {
            if (!(simbolo.indice == predicateExpresion)) {
                return false;
            }
        }else if(typeof predicateExpresion == "boolean" ){
            return predicateExpresion;
        }else if (predicateExpresion instanceof TablaSimbolos) {
            if (predicateExpresion.esVacia()) {
                return false;
            }
        }else if (predicateExpresion == null || predicateExpresion == undefined) {
            return false;
        }
        return true;
    }

    static getPrimitiveOfAtributeOrObject(tablaSimbolos:TablaSimbolos):Primitive{
        let valor : Primitive = null;
        if(tablaSimbolos instanceof TablaSimbolos){
            valor = tablaSimbolos.getContentRow();
        }
        return valor;
    }

    static isPrimitiveNumber(valor:Primitive){
        return valor.getTipo(null,XpathUtil.crearTablaSimbolos([])).esNumero();
    }
}