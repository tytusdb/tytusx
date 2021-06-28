import { Ambito } from "../../model/xml/Ambito/Ambito";
import { Tipos } from "../../model/xpath/Enum";
import Expresion from "../xpath/Expresion/Expresion";
import pushIterators from "./BuildElement";

function returnQuery(_expresion: any, _ambito: Ambito, _iterators: Array<any>) {
    let expresion: Array<any> = [];
    // console.log(_iterators.length, 4444)
    for (let i = 0; i < _iterators.length; i++) { // [$x, $y, $z]
        const iterator = _iterators[i]; // { id: $x, iterators: /book/title (contexto) }
        let iters = iterator.iterators;
        if (Array.isArray(iters)) iters = iters[0];
        // console.log(_expresion, 44444444, iters)
        let _x = Expresion(_expresion, _ambito, iters, iterator.id); // _expresion = [XPATH]
        // console.log(_x, 8888888888888888)
        if (_x) expresion = expresion.concat(_x);
    }
    // console.log(_expresion,409999,expresion)
    let _str: Array<any> = [pushIterators(expresion)];
    if (_expresion.tipo === Tipos.HTML) {
        _str.unshift({ valor: '<' + _expresion.id_open + '>' })
        _str.push({ valor: '</' + _expresion.id_close + '>' })
    }
    return { cadena: writeReturn(_str), parametros: expresion };
}

function writeReturn(_expresion: any): string {
    // console.log(_expresion, 3444);
    let cadena = "";
    let max = getMaxLength(_expresion);
    // console.log(max);
    for (let i = 0; i < max; i++) {
        for (let j = 0; j < _expresion.length; j++) {
            var exp = _expresion[j];
            if (exp.valor)
                cadena += exp.valor;
            else if (exp.length > 0) {
                let shift = exp.shift();
                if (shift.valor) continue;
                else if (shift.item) cadena += shift.item;
                else cadena += shift
                exp = exp.push(shift);
            }
        }
        cadena += '\n';
    }
    console.log(cadena)
    return cadena;
}

function getMaxLength(context: Array<any>): number {
    let index = 1;
    context.forEach(element => {
        if (element.length > index)
            index = element.length;
        if (element.elementos)
            index = element.elementos.length;
        if (element.iterators)
            index = element.iterators.length;
    });
    return index;
}

export = returnQuery;