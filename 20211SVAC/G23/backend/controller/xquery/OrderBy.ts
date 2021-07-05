import { Ambito } from "../../model/xml/Ambito/Ambito";
import Expresion from "../xpath/Expresion/Expresion";
import { Contexto } from "../Contexto";

function OrderBy(_instruccion: any, _ambito: Ambito, _iterators: Array<Contexto>): Array<Contexto> {
    let sorted: Array<Contexto> = [];
    try {
        for (let i = 0; i < _iterators.length; i++) { // [$x, $y, $z]
            const iterator = _iterators[i]; // { Contexto }
            let _x = Expresion(_instruccion, _ambito, iterator, iterator.variable?.id); // _instruccion = [comparissons]
            if (_x && !_x.error)
                sorted.push(sortIterators(_x, iterator));
        }
    } catch (error) {
        console.log(error);
    }
    return sorted;
}

function sortIterators(_contexto: Contexto, _root: Contexto) {
    let array = _contexto.removeDadDuplicates();
    let swapped = true;
    do {
        swapped = false;
        for (let j = 0; j < array.length; j++) {
            if (array[j + 1])
                if (array[j].value.charCodeAt(0) > array[j + 1].value.charCodeAt(0)) { // Compara valor inicial de ASCII
                    let temp = array[j];
                    let tmp = _root.elementos[j];
                    array[j] = array[j + 1];
                    _root.elementos[j] = _root.elementos[j + 1];
                    array[j + 1] = temp;
                    _root.elementos[j + 1] = tmp;
                    swapped = true;
                }
        }
    } while (swapped);
    return _root;
}

export = OrderBy;