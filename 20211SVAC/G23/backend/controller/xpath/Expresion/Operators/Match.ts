import { Tipos } from "../../../../model/xpath/Enum";
import { Contexto } from "../../../Contexto";

function filterElements(valor: any, desigualdad: Tipos, _contexto: Contexto, _root: Contexto): Array<Contexto> {
    try {
        let condition: boolean = false;
        let out: Array<Contexto> = [];
        let array = _contexto.removeDadDuplicates();
        for (let i = 0; i < array.length; i++) {
            const obj = array[i];
            condition = verificarDesigualdad(desigualdad, obj.value, valor);
            if (condition) { // Si la condición cumple, apilar los elementos en esa posición
                let context = new Contexto([_root.elementos[i]]);
                context.variable = _root.variable;
                out.push(context);
            }
        }
        return out;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function verificarDesigualdad(_tipo: Tipos, v1: any, e1: any): boolean {
    switch (_tipo) {
        case Tipos.RELACIONAL_MAYOR:
            return (v1 > e1);
        case Tipos.RELACIONAL_MAYORIGUAL:
            return (v1 >= e1);
        case Tipos.RELACIONAL_MENOR:
            return (v1 < e1);
        case Tipos.RELACIONAL_MENORIGUAL:
            return (v1 <= e1);
        case Tipos.RELACIONAL_IGUAL:
            return (v1 == e1);
        case Tipos.RELACIONAL_DIFERENTE:
            return (v1 != e1);
        default:
            return false;
    }
}

export = filterElements;