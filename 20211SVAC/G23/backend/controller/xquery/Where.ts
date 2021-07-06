import { Ambito } from "../../model/xml/Ambito/Ambito";
import Expresion from "../xpath/Expresion/Expresion";
import { Contexto } from "../Contexto";

function WhereClause(_instruccion: any, _ambito: Ambito, _iterators: Array<Contexto>): Array<Contexto> | any {
    let iterators: Array<Contexto> = [];
    for (let i = 0; i < _iterators.length; i++) { // [$x, $y, $z]
        const iterator = _iterators[i]; // { Contexto }
        let _x = Expresion(_instruccion, _ambito, iterator, iterator.variable?.id); // _instruccion = [comparissons]
        if (!_x || _x.error) return _x;
        iterators = iterators.concat(_x);
    }
    // console.log(iterators)
    return iterators;
}

export = WhereClause;