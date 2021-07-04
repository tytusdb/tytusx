import { Element } from "../../../../model/xml/Element";
import { Tipos } from "../../../../model/xpath/Enum";
import { Contexto } from "../../../Contexto";

function filterElements(valor: any, desigualdad: Tipos, _contexto: Contexto, _root: Contexto): Array<Contexto> {
    try {
        let condition: boolean = false;
        let out: Array<Element> = [];
        let array = _contexto.removeDadDuplicates();
        for (let i = 0; i < array.length; i++) {
            const obj = array[i];
            condition = verificarDesigualdad(desigualdad, obj, valor);
            if (condition) { // Si la condición cumple, apilar los elementos en esa posición
                out.push(_root.elementos[i]);
            }
        }
        _root.elementos = out;
        // console.log(_root,33333333333333)
        return [_root];
    } catch (error) {
        console.log(error);
        return [];
    }
}

function verificarDesigualdad(_tipo: Tipos, v1: any, e1: any): boolean {
    switch (_tipo) {
        case Tipos.RELACIONAL_MAYOR:
            return (v1.value > e1) || (v1.id > e1);
        case Tipos.RELACIONAL_MAYORIGUAL:
            return (v1.value >= e1) || (v1.id >= e1);
        case Tipos.RELACIONAL_MENOR:
            return (v1.value < e1) || (v1.id < e1);
        case Tipos.RELACIONAL_MENORIGUAL:
            return (v1.value <= e1) || (v1.id <= e1);
        case Tipos.RELACIONAL_IGUAL:
            return (v1.value == e1) || (v1.id == e1);
        case Tipos.RELACIONAL_DIFERENTE:
            return (v1.value != e1) && (v1.id != e1);
        default:
            return false;
    }
}

export = filterElements;