import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";
import Expresion from "../../Expresion/Expresion";
import { Element } from "../../../../model/xml/Element";
import { Atributo } from "../../../../model/xml/Atributo";
import { Predicate } from "./Predicate";
import Axis from "./Axis";

function Eje(_instruccion: any, _ambito: Ambito, _contexto: any): any {
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
        root = getSymbolFromRoot(expresion.valor, contexto, _ambito, predicate);
    }
    else if (expresion.tipo === Tipos.ATRIBUTOS) {
        root = getSymbolFromRoot({ id: expresion.valor, tipo: "@" }, contexto, _ambito, predicate);
        if (root.atributos.length === 0) return _404;
        if (root.atributos.error) return root.atributos;
    }
    else if (expresion.tipo === Tipos.ASTERISCO) {
        root = getSymbolFromRoot(expresion.valor, contexto, _ambito, predicate);
    }
    else if (expresion.tipo === Tipos.FUNCION_NODE) {
        root = getSymbolFromRoot(expresion.valor, contexto, _ambito, predicate);
        if (root.nodos.length === 0) return _404;
        if (root.nodos.error) return root.nodos;
    }
    else if (expresion.tipo === Tipos.FUNCION_TEXT) {
        root = getSymbolFromRoot(expresion.valor, contexto, _ambito, predicate);
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

function getSymbolFromRoot(_nodename: any, _contexto: Array<Element>, _ambito: Ambito, _condicion: any): any {
    if (_contexto)
        return getFromCurrent(_nodename, _contexto, _ambito, _condicion);
    else
        return { error: "Indstrucción no procesada.", tipo: "Semántico", origen: "Query", linea: 1, columna: 1 };
}

// Desde el ámbito actual
function getFromCurrent(_id: any, _contexto: any, _ambito: Ambito, _condicion: any): any {
    let elements = Array<Element>();
    let attributes = Array<Atributo>();
    // Selecciona el texto contenido únicamente en el nodo
    if (_id === "text()") {
        let text = Array<string>();
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            if (element.value) {
                text.push(element.value);
                elements.push(element);
            }
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            text = filter.filterElements(text);
            elements = filter.contexto;
        }
        return { texto: text, elementos: elements, cadena: Tipos.TEXTOS };
    }
    // Selecciona todos los hijos (elementos o texto)
    else if (_id === "node()") {
        let nodes = Array<any>();
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            if (element.childs)
                element.childs.forEach((child: Element) => {
                    nodes.push({ elementos: child });
                });
            else if (element.value)
                nodes.push({ textos: element.value });
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            nodes = filter.filterElements(nodes);
        }
        return { cadena: Tipos.COMBINADO, nodos: nodes, elementos: _contexto };
    }
    // Selecciona todos los hijos (elementos)
    else if (_id === "*") {
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            if (element.childs) {
                element.childs.forEach((child: Element) => {
                    elements.push(child);
                });
            }
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            elements = filter.filterElements(elements);
        }
        return { elementos: elements, cadena: Tipos.ELEMENTOS };
    }
    // Selecciona los atributos
    else if (_id.tipo === "@") {
        let flag: boolean = false;
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            if (element.attributes)
                element.attributes.forEach((attribute: Atributo) => {
                    if ((_id.id === attribute.id) || (_id.id === "*")) { // En caso de que sea un id ó @*
                        attributes.push(attribute);
                        flag = true;
                    }
                });
            if (flag) {
                elements.push(element);
                flag = false;
            }
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            attributes = filter.filterElements(attributes);
            elements = filter.contexto;
        }
        return { atributos: attributes, elementos: elements, cadena: Tipos.ATRIBUTOS };
    }
    // Selecciona el padre
    else if (_id === "..") {
        if (_contexto.atributos) {
            for (let i = 0; i < _contexto.atributos.length; i++) {
                const attribute = _contexto.atributos[i];
                _ambito.tablaSimbolos.forEach(elm => {
                    elements = _ambito.searchDadFromAttribute(elm, attribute, elements);
                });
            }
            return { elementos: elements };
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
    // Selecciona el nodo actual
    else if (_id === ".") {
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            elements.push(element);
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, elements);
            elements = filter.filterElements(elements);
        }
        return { elementos: elements, cadena: Tipos.ELEMENTOS };
    }
    // Búsqueda en los hijos por id
    else {
        for (let i = 0; i < _contexto.length; i++) {
            const element = _contexto[i];
            if (element.childs) {
                element.childs.forEach((child: Element) => {
                    elements = _ambito.searchSingleNode(_id, child, elements);
                });
            }
        }
        if (_condicion) {
            console.log(elements, 7777777)
            let filter = new Predicate(_condicion, _ambito, elements);
            elements = filter.filterElements(elements);
            console.log(elements, 888888)
        }
        return { elementos: elements, cadena: Tipos.ELEMENTOS };
    }
}

export =  Eje;