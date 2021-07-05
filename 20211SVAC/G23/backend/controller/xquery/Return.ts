import { Ambito } from "../../model/xml/Ambito/Ambito";
import { Tipos } from "../../model/xpath/Enum";
import { Contexto } from "../Contexto";
import Expresion from "../xpath/Expresion/Expresion";
import pushIterators from "./Expresion/BuildElement";

function returnQuery(_expresion: any, _ambito: Ambito, _iterators: Array<Contexto>) {
    let expresion: Array<any> = [];
    for (let i = 0; i < _iterators.length; i++) { // [$x, $y, $z]
        const iterator = _iterators[i]; // { Contexto }
        let _x = Expresion(_expresion, _ambito, iterator, iterator.variable?.id); // _expresion = [XPATH]
        if (_x && !_x.error) expresion = expresion.concat(_x);
        // console.log(_x)
    }

    let _str: Array<any> = pushIterators(expresion);
    if (_expresion.tipo === Tipos.HTML) {
        _str.unshift({ valor: '<' + _expresion.id_open + '>' })
        _str.push({ valor: '</' + _expresion.id_close + '>' })
    }

    return { valor: writeReturn(_str), parametros: expresion };
}

function writeReturn(_expresion: any): string {
    // console.log(_expresion, 3444);
    let cadena = "";
    let max = getMaxLength(_expresion);
    // console.log(max);
    for (let i = 0; i < max; i++) {
        for (let j = 0; j < _expresion.length; j++) {
            var exp = _expresion[j];
            if (exp.notFound) cadena += exp.notFound;
            if (exp.valor)
                cadena += exp.valor;
            else if (exp.items && exp.items.length > 0) {
                let shift = exp.items.shift();
                cadena += shift;
                exp.items.push(shift);
            }
            else if (Array.isArray(exp) && exp.length > 0) {
                let shift = exp.shift();
                if (shift.item) cadena += shift.item;
                else cadena += shift;
                exp = exp.push(shift);
            }
        }
        cadena += '\n';
    }
    // console.log(cadena)
    return cadena;
}

function getMaxLength(context: Array<any>): number {
    let index = 1;
    context.forEach(element => {
        if (element.length > index)
            index = element.length;
        if (element.constructor.name == "Contexto")
            index = element.getLength();
    });
    return index;
}

export = returnQuery;