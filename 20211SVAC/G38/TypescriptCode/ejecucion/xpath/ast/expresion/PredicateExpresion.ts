class PredicateExpresion {

    static filterXpathExpresion(ent: TablaSimbolos, listaPredicados: Expresion[]):TablaSimbolos{
        let ultimaPosicion = ent.getLastPosition();
        let tablaFiltrada = XpathUtil.crearTablaSimbolos(
            ent.listaSimbolos.filter(function (simbolo) {
                for(let predicado of listaPredicados){
                    let expresion =
                        predicado.getValor(null,XpathUtil.crearTablaSimbolosAndSetLastPosition([simbolo],ultimaPosicion));
                    return PredicateExpresion.validatePredicateExpresion(expresion, simbolo, ent);
                }
                return true;
            })
        );
        return tablaFiltrada;
    }

    static validatePredicateExpresion(expresion:any,simbolo:TsRow,ent:TablaSimbolos){
        if(expresion instanceof Primitive) {
            if (expresion.getTipo(null,ent).esNumero()) {
                if (!(simbolo.indice == expresion.getValor(null,ent))) {
                    return false;
                }
            } else if (expresion.getTipo(null,ent).esBoolean()) {
                return expresion.getValor(null,ent);
            }else if (!expresion.getTipo(null,ent).esBoolean()) {
                return false;
            }
        }
        if (typeof expresion == "number") {
            if (!(simbolo.indice == expresion)) {
                return false;
            }
        }else if(typeof expresion == "boolean" ){
            return expresion;
        }else if (expresion instanceof TablaSimbolos) {
            if (expresion.esVacia()) {
                return false;
            }
        }else if (expresion == null || expresion == undefined) {
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