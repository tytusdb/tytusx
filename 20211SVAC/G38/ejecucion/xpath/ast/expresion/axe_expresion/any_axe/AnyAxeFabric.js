"use strict";
class AnyAxeFabric {
    static createAnyAxeExpresion(axeType, axeOperation, identifier, listaPredicados, linea, columna) {
        let axeExpresion;
        switch (axeType) {
            case AxeType.ancestoOrSelfType:
            case AxeType.ancestorType:
                axeExpresion = new AnyAncestor(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
            case AxeType.attributeType:
                axeExpresion = new AnyAxeAtribute(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
            case AxeType.childType:
                axeExpresion = new AnyChild(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
            case AxeType.descendantOrSelfType:
            case AxeType.descendantType:
                axeExpresion = new AnyDescendant(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
            case AxeType.followingSiblingType:
            case AxeType.followingType:
                axeExpresion = new AnyFollowing(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
            case AxeType.namespaceType:
                axeExpresion = new AnySelf(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
            case AxeType.precedingSiblingType:
            case AxeType.precedingType:
                axeExpresion = new AnyPreceding(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
            case AxeType.parentType:
                axeExpresion = new AnyAxeParent(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
            case AxeType.selfType:
                axeExpresion = new AnySelf(axeType, axeOperation, identifier, listaPredicados, linea, columna);
                break;
        }
        return axeExpresion;
    }
}
