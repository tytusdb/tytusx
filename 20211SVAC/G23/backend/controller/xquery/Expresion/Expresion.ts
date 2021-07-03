import { Tipos } from "../../../model/xpath/Enum";
import { Ambito } from "../../../model/xml/Ambito/Ambito";
import { Element } from "../../../model/xml/Element";
import Expresion from "../../xpath/Expresion/Expresion";

function ExpresionQuery(_expresion: any, _ambito: Ambito, _contexto: Array<Element>, id?: any): any {
    let tipo: Tipos = _expresion.tipo;

    if (tipo === Tipos.DECLARACION) {
        let iterators: Array<any> = [];
        let id = Expresion(_expresion.variable, _ambito, _contexto);
        let it = Expresion(_expresion.iterators, _ambito, _contexto);
        if (!id.error && !it.error)
            iterators.push({ id: id.valor, iterators: it });
        return iterators;
    }

    if (tipo === Tipos.VARIABLE) {
        // console.log(_expresion, 33444, _contexto)
        if (id && hasElements(_contexto)) {
            if (id === _expresion.variable)
                return _contexto;
            else return null;
        }
        return { valor: _expresion.variable };
    }

    // if (Array.isArray(_expresion)) {
    //     const Bloque = require("../../xpath/Instruccion/Bloque");
    //     const elements = Bloque.getIterators(_expresion, _ambito, _contexto);
    //     return elements; //<- Retorna un arreglo de elementos
    // }

    if (tipo === Tipos.HTML) {
        let content: Array<any> = [];
        for (let i = 0; i < _expresion.value.length; i++) {
            const value = Expresion(_expresion.value[i], _ambito, _contexto, id);
            if (value)
                content = content.concat(value);
            // else
            //     content.pop();
        }
        return content;
    }

    if (tipo === Tipos.CONTENIDO) {
        return { valor: _expresion.contenido };
    }

    if (tipo === Tipos.INYECCION) {
        let e_0 = Expresion(_expresion.path[0], _ambito, _contexto, id);
        if (!e_0) return null;
        if (_contexto[0].item) return _contexto
        const Bloque = require("../../xpath/Instruccion/Bloque");
        let elements: Array<any> = [];
        // elements.push(e_0);
        let _x = Bloque.getIterators(_expresion.path, _ambito, _contexto[0], id);
        if (_x && _x.length > 0) {
            _contexto = _x;
            elements = elements.concat(_x);
        }
        return elements;
    }

    if (tipo === Tipos.INTERVALO) {
        let iterators = [];
        let val_1 = Expresion(_expresion.valor1, _ambito, _contexto); if (val_1.error) return val_1;
        let val_2 = Expresion(_expresion.valor2, _ambito, _contexto); if (val_2.error) return val_2;
        for (let i = parseInt(val_1.valor); i <= parseInt(val_2.valor); i++) {
            iterators.push({ item: i });
        }
        return iterators;
    }

    if (tipo === Tipos.VALORES) {
        let iterators: Array<any> = [];
        _expresion.valores.forEach((valor: any) => {
            const expresion = Expresion(valor, _ambito, _contexto);
            if (!expresion.error)
                iterators.push({ item: parseInt(expresion.valor) });
        });
        return iterators;
    }

    else {
        const Bloque = require('../../xpath/Instruccion/Bloque');
        // console.log(_expresion,4444);
        let _bloque = Bloque.getIterators(_expresion, _ambito, _contexto, id);
        if (_bloque === null || _bloque.error) return _bloque;
        else _contexto = _bloque;
        return _contexto
    }
}

function hasElements(_array: Array<any>): boolean {
    for (let i = 0; i < _array.length; i++) {
        const element = _array[i];
        if (element.cadena)
            if (element.cadena.length > 0) return true;
        if (element.item)
            return true;
    }
    return false;
}

export = ExpresionQuery;