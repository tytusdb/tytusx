import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";
import Expresion from "../../Expresion/Expresion";
import { Element } from "../../../../model/xml/Element";
import { Atributo } from "../../../../model/xml/Atributo";
import { Predicate } from "./Predicate";
import Axis from "./Axis";

function DobleEje(_instruccion: any, _ambito: Ambito, _contexto: any): any {
    let retorno = { cadena: Tipos.NONE, elementos: null }
    let _404 = { notFound: "No se encontraron elementos." };
    let contexto: any = (_contexto.elementos) ? (_contexto.elementos) : null;
    let expresion;
    if (_instruccion.expresion.expresion) expresion = Expresion(_instruccion.expresion.expresion, _ambito, contexto);
    else expresion = Expresion(_instruccion.expresion, _ambito, contexto);
    if (expresion.error) return expresion;
    let predicate = _instruccion.expresion.predicate;
    let root: any;
    if (expresion.tipo === Tipos.ELEMENTOS) {
        root = getAllSymbolFromCurrent(expresion.valor, contexto, _ambito, predicate);
    }
    else if (expresion.tipo === Tipos.ATRIBUTOS) {
        root = getAllSymbolFromCurrent({ id: expresion.valor, tipo: "@" }, contexto, _ambito, predicate);
        if (root.atributos.length === 0) return _404;
        if (root.atributos.error) return root.atributos;
    }
    else if (expresion.tipo === Tipos.ASTERISCO) {
        root = getAllSymbolFromCurrent(expresion.valor, contexto, _ambito, predicate);
    }
    else if (expresion.tipo === Tipos.FUNCION_NODE) {
        root = getAllSymbolFromCurrent(expresion.valor, contexto, _ambito, predicate);
        if (root.nodos.length === 0) return _404;
        if (root.nodos.error) return root.nodos;
    }
    else if (expresion.tipo === Tipos.FUNCION_TEXT) {
        root = getAllSymbolFromCurrent(expresion.valor, contexto, _ambito, predicate);
        if (root.texto.length === 0) return _404;
        if (root.texto.error) return root.texto;
    }
    else if (expresion.tipo === Tipos.SELECT_AXIS) {
        root = Axis.GetAxis(expresion.axisname, expresion.nodetest, expresion.predicate, contexto, _ambito);
        if (root.error) return root;
        if (root.atributos.error) return root.atributos;
    }
    else {
        return { error: "Expresión no válida.", tipo: "Semántico", origen: "Query", linea: _instruccion.linea, columna: _instruccion.columna };
    }
    if (root === null || root.error || root.elementos.length === 0) return _404;
    if (root.elementos.error) return root.elementos;
    retorno = root;
    return retorno;
}

function getAllSymbolFromCurrent(_nodename: any, _contexto: Array<Element>, _ambito: Ambito, _condicion: any) {
    if (_contexto)
        return getFromCurrent(_nodename, _contexto, _ambito, _condicion);
    else
        return { error: "Indstrucción no procesada.", tipo: "Semántico", origen: "Query", linea: 1, columna: 1 };
}

function getFromCurrent(_id: any, _contexto: any, _ambito: Ambito, _condicion: any): any {
    let elements = Array<Element>();
    let attributes = Array<Atributo>();
    let nodes = Array<any>();
    // Selecciona únicamente el texto contenido en el nodo y todos sus descendientes
    if (_id === "text()") {
        let text = Array<string>();
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            text = _ambito.searchAnyText(element, text);
            elements.push(element);
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            text = filter.filterElements(text);
        }
        return { texto: text, elementos: elements, cadena: Tipos.TEXTOS };
    }
    // Selecciona todos los descencientes (elementos y/o texto)
    else if (_id === "node()") {
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            if (element.childs) {
                element.childs.forEach((child: Element) => {
                    nodes = _ambito.nodesFunction(child, nodes);
                });
            }
            else if (element.value)
                nodes.push({ textos: element.value });
            elements.push(element);
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            nodes = filter.filterElements(nodes);
            elements = filter.contexto;
        }
        return { cadena: Tipos.COMBINADO, nodos: nodes, elementos: _contexto };
    }
    // Selecciona todos los atributos a partir del contexto
    else if (_id.tipo === "@") {
        let a = { atributos: attributes, elementos: elements };
        if (_id.id === "*") {
            for (let i = 0; i < _contexto.length; i++) {
                const element = _contexto[i];
                a = _ambito.searchAnyAttributes(element, attributes, elements);
            }
        }
        else {
            for (let i = 0; i < _contexto.length; i++) {
                const element = _contexto[i];
                a = _ambito.searchAttributesFromCurrent(element, _id.id, attributes, elements);
            }
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, a.elementos);
            a.atributos = filter.filterElements(a.atributos);
            a.elementos = filter.contexto;
        }
        return { atributos: a.atributos, elementos: a.elementos, cadena: Tipos.ATRIBUTOS };
    }
    else if (_id === "..") {
        if (_contexto.atributos) {
            for (let i = 0; i < _contexto.atributos.length; i++) {
                const attribute = _contexto.atributos[i];
                _ambito.tablaSimbolos.forEach(elm => {
                    elements = _ambito.searchDadFromAttribute(elm, attribute, elements);
                });
            }
            if (_condicion) {
                let filter = new Predicate(_condicion, _ambito, elements);
                elements = filter.filterElements(elements);
            }
            return { elementos: elements, cadena: Tipos.ELEMENTOS };
        }
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            let dad = element.father;
            if (dad) {
                _ambito.tablaSimbolos.forEach(elm => {
                    if (elm.id_open === dad.id && elm.line == dad.line && elm.column == dad.column)
                        elements.push(elm);
                    if (elm.childs)
                        elm.childs.forEach(child => {
                            elements = _ambito.searchDad(child, dad.id, dad.line, dad.column, elements);
                        });
                });
            }
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            elements = filter.filterElements(elements);
        }
        return { elementos: elements, cadena: Tipos.ELEMENTOS };
    }
    // Selecciona todos los descendientes con el id o en el caso que sea //*
    else {
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            if (element.childs)
                element.childs.forEach((child: Element) => {
                    elements = _ambito.searchNodes(_id, child, elements);
                });
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            elements = filter.filterElements(elements);
        }
        return { elementos: elements, cadena: Tipos.ELEMENTOS };
    }
}

export =  DobleEje;