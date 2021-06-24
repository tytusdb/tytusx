class AxeFabric{

    public static createAxeExpresion(axeType:AxeType,axeOperation:AxeOperation, identifier:string, listaPredicados:Expresion[], linea:number, columna:number): Expresion{
        let axeExpresion : Expresion;
        switch (axeType){
            case AxeType.ancestoOrSelfType:
            case AxeType.ancestorType:
                axeExpresion = new Ancestor(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
            case AxeType.attributeType:
                axeExpresion = new Atribute(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
            case AxeType.childType:
                axeExpresion = new Child(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
            case AxeType.descendantOrSelfType:
            case AxeType.descendantType:
                axeExpresion = new Descendant(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
            case AxeType.followingSiblingType:
            case AxeType.followingType:
                axeExpresion = new Following(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
            case AxeType.namespaceType:
                axeExpresion = new Self(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
            case AxeType.precedingSiblingType:
            case AxeType.precedingType:
                axeExpresion = new Preceding(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
            case AxeType.parentType:
                axeExpresion = new Parent(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
            case AxeType.selfType:
                axeExpresion = new Self(axeType,axeOperation,identifier,listaPredicados,linea,columna);
                break;
        }
        return axeExpresion;
    }
}