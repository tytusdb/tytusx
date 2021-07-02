import { Ambito } from "../../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../../model/xpath/Enum";
import Expresion from "../../../Expresion/Expresion";
import { Element } from "../../../../../model/xml/Element";
import { Atributo } from "../../../../../model/xml/Atributo";
import { Predicate } from "../Predicate";
import { Contexto } from "../../../../Contexto";
import { Variable } from "../../../../../model/xml/Ambito/Variable";

function SelectAxis(_instruccion: any, _ambito: Ambito, _contexto: Contexto, id?: any): Contexto {
    let _404 = "No se encontraron elementos.";
    let expresion = Expresion(_instruccion, _ambito, _contexto, id);
    if (expresion === null || expresion.error) return expresion;
    let root: Contexto = getAxis(expresion.axisname, expresion.nodetest, expresion.predicate, _contexto, _ambito, false, id);
    if (root === null || root.error || root.getLength() === 0) root.notFound = _404;
    return root;
}

function getAxis(_axisname: Tipos, _nodetest: any, _predicate: any, _contexto: Contexto, _ambito: Ambito, _isDoubleBar: boolean, id?: any): Contexto {
    if (_contexto.getLength() > 0)
        return firstFiler(_axisname, _nodetest, _predicate, _contexto, _ambito, _isDoubleBar, id);
    else {
        _contexto.error = { error: "Instrucción no procesada.", tipo: "Semántico", origen: "Query", linea: 1, columna: 1 };
        return _contexto;
    }
}

// Revisa el axisname y extrae los elementos
function firstFiler(_axisname: Tipos, _nodetest: any, _predicate: any, _contexto: Contexto, _ambito: Ambito, _isDoubleBar: boolean, id?: any): Contexto {
    let retorno = new Contexto();
    if (id) {
        retorno.variable = new Variable(id, Tipos.VARIABLE);
    }
    retorno.cadena = Tipos.ELEMENTOS;
    switch (_axisname) {
        case Tipos.AXIS_ANCESTOR: // Selects all ancestors (parent, grandparent, etc.) of the current node
        case Tipos.AXIS_ANCESTOR_OR_SELF: // Selects all ancestors (parent, grandparent, etc.) of the current node and the current node itself
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element: Element = _contexto.elementos[i];
                if (_axisname === Tipos.AXIS_ANCESTOR_OR_SELF) {
                    if (element.father) retorno.elementos.push(element);
                    else retorno.elementos.push(element.childs[0]);
                }
                if (element.father) {
                    retorno.elementos = _ambito.compareCurrent(element, retorno.elementos, _axisname);
                }
            }
            break;
        case Tipos.AXIS_ATTRIBUTE: // Selects all attributes of the current node
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element = _contexto.elementos[i];
                if (_isDoubleBar) {
                    retorno.atributos = _ambito.searchAnyAttributes("*", element, retorno.atributos);
                }
                else if (element.attributes)
                    element.attributes.forEach((attribute: Atributo) => {
                        retorno.atributos.push(attribute);
                    });
            }
            retorno.cadena = Tipos.ATRIBUTOS;
            break;
        case Tipos.AXIS_CHILD: // Selects all children of the current node
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element = _contexto.elementos[i];
                if (_isDoubleBar) {
                    if (element.father) retorno.elementos = _ambito.searchNodes("*", element, retorno.elementos);
                    else retorno.elementos = _ambito.searchNodes("*", element.childs[0], retorno.elementos);
                }
                else if (element.childs)
                    element.childs.forEach((child: Element) => {
                        retorno.elementos.push(child);
                    });
            }
            break;
        case Tipos.AXIS_DESCENDANT: // Selects all descendants (children, grandchildren, etc.) of the current node
        case Tipos.AXIS_DESCENDANT_OR_SELF: // Selects all descendants (children, grandchildren, etc.) of the current node and the current node itself
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element: Element = _contexto.elementos[i];
                if (_axisname === Tipos.AXIS_DESCENDANT_OR_SELF) {
                    if (element.father) retorno.elementos.push(element);
                    // else elements.push(element.childs[0]);
                }
                if (element.father) retorno.elementos = _ambito.searchNodes("*", element, retorno.elementos);
                else retorno.elementos = _ambito.searchNodes("*", element.childs[0], retorno.elementos);
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
                    retorno.elementos = _ambito.compareCurrent(element, retorno.elementos, _axisname);
                }
                else if (_axisname === Tipos.AXIS_FOLLOWING || _axisname === Tipos.AXIS_FOLLOWING_SIBLING) {
                    retorno.elementos = _ambito.compareCurrent(element, retorno.elementos, _axisname);
                }
            }
            break;
        case Tipos.AXIS_NAMESPACE: // Selects all namespace nodes of the current node
            retorno.error = { error: "Error: la funcionalidad 'namespace' no está disponible.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
            break;
        case Tipos.AXIS_PARENT: // Selects the parent of the current node
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element = _contexto.elementos[i];
                let dad = element.father;
                if (dad)
                    _ambito.tablaSimbolos.forEach(elm => {
                        if (elm.id_open === dad.id && elm.line == dad.line && elm.column == dad.column)
                            retorno.elementos.push(elm);
                        if (elm.childs)
                            elm.childs.forEach(child => {
                                retorno.elementos = _ambito.searchDad(child, dad.id, dad.line, dad.column, retorno.elementos);
                            });
                    });
            }
            break;
        case Tipos.AXIS_SELF: // Selects the current node
            retorno = _contexto;
            break;
        default:
            retorno.error = { error: "Error: axisname no válido.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
            break;
    }
    return secondFilter(retorno, _nodetest, _predicate, _ambito, _isDoubleBar);
}

// Revisa el nodetest y busca hacer match
function secondFilter(_contexto: Contexto, _nodetest: any, _predicate: any, _ambito: Ambito, _isDoubleBar: boolean, id?: any): Contexto {
    let valor = _nodetest.valor;
    let retorno = new Contexto();
    if (id) {
        retorno.variable = new Variable(id, Tipos.VARIABLE);
    }
    retorno.cadena = Tipos.ELEMENTOS;
    switch (_nodetest.tipo) {
        case Tipos.ELEMENTOS:
        case Tipos.ASTERISCO:
        case Tipos.FUNCION_TEXT:
        case Tipos.FUNCION_NODE:
            if (_contexto.atributos.length > 0) {
                for (let i = 0; i < _contexto.atributos.length; i++) {
                    const attribute = _contexto.atributos[i];
                    if (attribute.id == valor || valor === "*") {
                        retorno.atributos.push(attribute);
                    }
                    else if (attribute.value == valor) {
                        retorno.atributos.push(attribute);
                    }
                }
                retorno.cadena = Tipos.ATRIBUTOS;
            }
            else if (_contexto.texto.length > 0) {
                for (let i = 0; i < _contexto.texto.length; i++) {
                    const text = _contexto.texto[i];
                    if (text == valor || valor === "*") {
                        retorno.texto.push(text);
                    }
                }
                retorno.cadena = Tipos.TEXTOS;
            }
            else if (_contexto.nodos.length > 0) {
                for (let i = 0; i < _contexto.nodos.length; i++) {
                    const node = _contexto.nodos[i];
                    if (node.textos == valor || valor === "*") {
                        retorno.nodos.push(node);
                    }
                    else if (node.elementos.id_open == valor || node.elementos.value == valor) {
                        retorno.nodos.push(node);
                    }
                }
                retorno.cadena = Tipos.COMBINADO;
            }
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const element = _contexto.elementos[i];
                if (_nodetest.tipo === Tipos.FUNCION_TEXT && element.value) {
                    _contexto.texto.push(element.value);
                }
                else if (element.id_open == valor || valor == "*" || _nodetest.tipo === Tipos.FUNCION_NODE) {
                    retorno.elementos.push(element);
                }
                else if (element.childs) {
                    element.childs.forEach(child => {
                        if (child.id_open == valor)
                            retorno.elementos.push(child);
                    });
                }
                retorno.removeDuplicates();
            }
            break;
        default:
            retorno.error = { error: "Error: nodetest no válido.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
    }
    // En caso de tener algún predicado
    if (_predicate) {
        let filter = new Predicate(_predicate, _ambito, retorno);
        if (retorno.atributos.length > 0) retorno.atributos = filter.filterElements(retorno.atributos);
        else if (retorno.texto.length > 0) retorno.texto = filter.filterElements(retorno.texto);
        else retorno.elementos = filter.filterElements(retorno.elementos);
    }
    return retorno;
}

export =  { SA: SelectAxis, GetAxis: getAxis };