import { Ambito } from "../../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../../model/xpath/Enum";
import Expresion from "../../../Expresion/Expresion";
import { Element } from "../../../../../model/xml/Element";
import { Atributo } from "../../../../../model/xml/Atributo";
import Funciones from "./Funciones";
import { Predicate } from "../Predicate";

function SelectAxis(_instruccion: any, _ambito: Ambito, _contexto: any): any {
    let _404 = { notFound: "No se encontraron elementos." };
    let contexto: any = (_contexto.elementos) ? (_contexto) : null;
    let expresion = Expresion(_instruccion, _ambito, contexto);
    if (expresion.error) return expresion;
    let root: any = getAxis(expresion.axisname, expresion.nodetest, expresion.predicate, contexto, _ambito, false);
    if (root === null || root.error || root.elementos.error || (root.elementos.length === 0 && root.atributos.length === 0)) return _404;
    return root;
}

function getAxis(_axisname: Tipos, _nodetest: any, _predicate: any, _contexto: any, _ambito: Ambito, _isDoubleBar: boolean): any {
    if (_contexto)
        return firstFiler(_axisname, _nodetest, _predicate, _contexto, _ambito, _isDoubleBar);
    else
        return { error: "Indstrucción no procesada.", tipo: "Semántico", origen: "Query", linea: 1, columna: 1 };
}

// Revisa el axisname y extrae los elementos
function firstFiler(_axisname: Tipos, _nodetest: any, _predicate: any, _contexto: any, _ambito: Ambito, _isDoubleBar: boolean): any {
    let elements = Array<Element>();
    let attributes = Array<Atributo>();
    let cadena: Tipos = Tipos.ELEMENTOS;
    switch (_axisname) {
        case Tipos.AXIS_ANCESTOR: // Selects all ancestors (parent, grandparent, etc.) of the current node
        case Tipos.AXIS_ANCESTOR_OR_SELF: // Selects all ancestors (parent, grandparent, etc.) of the current node and the current node itself
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element: Element = _contexto.elementos[i];
                if (_axisname === Tipos.AXIS_ANCESTOR_OR_SELF) {
                    if (element.father) elements.push(element);
                    else elements.push(element.childs[0]);
                }
                let dad = element.father;
                if (dad) {
                    elements = _ambito.compareCurrent(element, elements, _axisname);
                }
            }
            break;
        case Tipos.AXIS_ATTRIBUTE: // Selects all attributes of the current node
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element = _contexto.elementos[i];
                if (_isDoubleBar) {
                    attributes = _ambito.searchAnyAttributes("*", element, attributes);
                }
                else if (element.attributes)
                    element.attributes.forEach((attribute: Atributo) => {
                        attributes.push(attribute);
                    });
            }
            cadena = Tipos.ATRIBUTOS;
            break;
        case Tipos.AXIS_CHILD: // Selects all children of the current node
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element = _contexto.elementos[i];
                // if (_isDoubleBar) {
                //     elements = _ambito.searchNodes("*", element, elements);
                // }
                if (element.childs)
                    element.childs.forEach((child: Element) => {
                        elements.push(child);
                    });
            }
            break;
        case Tipos.AXIS_DESCENDANT: // Selects all descendants (children, grandchildren, etc.) of the current node
        case Tipos.AXIS_DESCENDANT_OR_SELF: // Selects all descendants (children, grandchildren, etc.) of the current node and the current node itself
            console.log(_contexto.elementos, 8989)
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element: Element = _contexto.elementos[i];
                if (_axisname === Tipos.AXIS_DESCENDANT_OR_SELF) {
                    if (element.father) elements.push(element);
                    // else elements.push(element.childs[0]);
                }
                if (element.father) elements = _ambito.searchNodes("*", element, elements);
                else elements = _ambito.searchNodes("*", element.childs[0], elements);
            }
            break;
        case Tipos.AXIS_FOLLOWING: // Selects everything in the document after the closing tag of the current node
        case Tipos.AXIS_PRECEDING: // Selects all nodes that appear before the current node in the document
        case Tipos.AXIS_FOLLOWING_SIBLING: // Selects all siblings after the current node:
        case Tipos.AXIS_PRECEDING_SIBLING: // Selects all siblings before the current node
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element = _contexto.elementos[i];
                let dad = element.father;
                if (dad && (_axisname === Tipos.AXIS_PRECEDING || _axisname === Tipos.AXIS_PRECEDING_SIBLING)) {
                    elements = _ambito.compareCurrent(element, elements, _axisname);
                }
                else if (_axisname === Tipos.AXIS_FOLLOWING || _axisname === Tipos.AXIS_FOLLOWING_SIBLING) {
                    elements = _ambito.compareCurrent(element, elements, _axisname);
                }
            }
            break;
        case Tipos.AXIS_NAMESPACE: // Selects all namespace nodes of the current node
            return { error: "Error: la funcionalidad 'namespace' no está disponible.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
        case Tipos.AXIS_PARENT: // Selects the parent of the current node
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element = _contexto.elementos[i];
                let dad = element.father;
                if (dad)
                    _ambito.tablaSimbolos.forEach(elm => {
                        if (elm.id_open === dad.id && elm.line == dad.line && elm.column == dad.column)
                            elements.push(elm);
                        if (elm.childs)
                            elm.childs.forEach(child => {
                                elements = _ambito.searchDad(child, dad.id, dad.line, dad.column, elements);
                            });
                    });
            }
            break;
        case Tipos.AXIS_SELF: // Selects the current node
            if (_contexto.atributos)
                attributes = _contexto.atributos;
            else
                elements = _contexto.elementos;
            break;
        default:
            return { error: "Error: axisname no válido.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
    }
    // return { elementos: elements, atributos: attributes, cadena: cadena };
    return secondFilter(elements, attributes, _nodetest, _predicate, cadena, _ambito, _isDoubleBar);
}

// Revisa el nodetest y busca hacer match
function secondFilter(_elements: Array<Element>, _atributos: Array<Atributo>, _nodetest: any, _predicate: any, _cadena: Tipos, _ambito: Ambito, _isDoubleBar: boolean) {
    let elements = Array<Element>();
    let attributes = Array<Atributo>();
    let text = Array<string>();
    let valor = _nodetest.valor;
    switch (_nodetest.tipo) {
        case Tipos.ELEMENTOS:
        case Tipos.ASTERISCO:
        case Tipos.FUNCION_TEXT:
            if (_atributos.length > 0) {
                for (let i = 0; i < _atributos.length; i++) {
                    const attribute = _atributos[i];
                    if (attribute.id == valor || valor === "*") {
                        attributes.push(attribute);
                    }
                    if (attribute.value == valor) {
                        attributes.push(attribute);
                    }
                }
            }
            for (let i = 0; i < _elements.length; i++) {
                const element = _elements[i];
                if (_nodetest.tipo === Tipos.FUNCION_TEXT && element.value) {
                    let x = Funciones.f1(element, elements, text, _isDoubleBar);
                    elements.concat(x.elementos);
                    text.concat(x.texto);
                    _cadena = Tipos.TEXTOS;
                    continue;
                }
                else if (_atributos.length > 0 && element.attributes) {
                    let x = Funciones.f2(element, elements, attributes, valor, _isDoubleBar);
                    elements.concat(x.elementos);
                    attributes = attributes.concat(x.atributos);
                    _cadena = Tipos.ATRIBUTOS;
                    continue;
                }
                let x = Funciones.f3(element, elements, text, valor, _nodetest.tipo, _isDoubleBar);
                if (x.elementos.length > 0 || x.texto.length > 0) {
                    elements.concat(x.elementos);
                    text.concat(x.texto);
                    continue; // break;
                }
                x = Funciones.f4(element, elements, text, valor, _nodetest.tipo, _isDoubleBar);
                if (x.elementos.length > 0 || x.texto.length > 0) {
                    elements.concat(x.elementos);
                    text.concat(x.texto);
                    break; //continue;
                }
            }
            break;
        default:
            return { error: "Error: nodetest no válido.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
    }
    // En caso de tener algún predicado
    if (_predicate) {
        let filter = new Predicate(_predicate, _ambito, elements);
        if (attributes.length > 0) {
            attributes = filter.filterAttributes(attributes);
            return { elementos: [], atributos: attributes, cadena: _cadena };
        }
        elements = filter.filterElements(elements);
    }
    return { elementos: elements, atributos: attributes, texto: text, cadena: _cadena };
}

export =  { SA: SelectAxis, GetAxis: getAxis };