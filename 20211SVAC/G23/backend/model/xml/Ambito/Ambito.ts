import { Contexto } from "../../../controller/Contexto";
import { Funcion } from "../../../controller/Funcion";
import { Tipos } from "../../xpath/Enum";
import { Atributo } from "../Atributo";
import { Element } from "../Element";
import { Variable } from "./Variable";

export class Ambito {

    anterior: Ambito;
    tipo: string;
    tablaSimbolos: Array<Element>;
    contextFromVar?: Variable | null;
    tablaFunciones: Array<Funcion>;
    tablaVariables: Array<Variable>;

    constructor(_anterior: any, _tipo: string) {
        this.anterior = _anterior
        this.tipo = _tipo
        this.tablaSimbolos = [];
        this.tablaFunciones = [];
        this.tablaVariables = [];
    }

    addSimbolo(_simbolo: Element) {
        this.tablaSimbolos.push(_simbolo);
    }

    addFunction(_function: Funcion) {
        this.tablaFunciones.unshift(_function);
    }

    getFunction(_name: string, _numParams: number): Funcion | null {
        for (let i = 0; i < this.tablaFunciones.length; i++) {
            const funcion = this.tablaFunciones[i];
            if (_name == funcion.name && _numParams == funcion.parametros.length) {
                return funcion;
            }
        }
        return null;
    }

    nodesFunction(_element: Element, _nodes: Array<any>): Array<any> { // Todos los descendientes (con textos)
        if (_element.childs) {
            _element.childs.forEach(child => {
                _nodes = this.nodesFunction(child, _nodes);
            });
        }
        if (_element.value) {
            _nodes.push({ elementos: _element });
            _nodes.push({ textos: _element.value });
        }
        return _nodes;
    }

    searchDad(_element: Element, _nodename: string, _line: string, _column: string, _elements: Array<Element>): Array<Element> {
        if (_element.childs) {
            _element.childs.forEach(child => {
                _elements = this.searchDad(child, _nodename, _line, _column, _elements);
            });
        }
        if (_nodename === _element.id_open && _element.line == _line && _element.column == _column) {
            _elements.push(_element);
        }
        return _elements;
    }

    searchDadFromAttribute(_element: Element, _attribute: Atributo, _elements: Array<Element>): Array<Element> {
        if (_element.childs) {
            _element.childs.forEach(child => {
                _elements = this.searchDadFromAttribute(child, _attribute, _elements);
            });
        }
        if (_element.attributes) {
            _element.attributes.forEach(attr => {
                if (attr.id === _attribute.id && attr.line == _attribute.line && attr.column == _attribute.column) {
                    _elements.push(_element);
                    return _elements;
                }
            });
        }
        return _elements;
    }

    searchDadFromText(_element: Element, _text: string, _elements: Array<Element>): Array<Element> {
        if (_element.childs) {
            _element.childs.forEach(child => {
                _elements = this.searchDadFromText(child, _text, _elements);
            });
        }
        if (_element.value) {
            if (_element.value === _text) {
                _elements.push(_element);
                return _elements
            }
        }
        if (_element.attributes) {
            _element.attributes.forEach(attr => {
                if (attr.value === _text) {
                    _elements.push(_element);
                    return _elements;
                }
            });
        }
        return _elements;
    }

    searchDadFromNode(_element: Element, _node: any, _elements: Array<Element>): Array<Element> {
        if (_element.childs) {
            _element.childs.forEach(child => {
                _elements = this.searchDadFromNode(child, _node, _elements);
            });
        }
        if (_element.value && _node.textos) {
            if (_element.value == _node.textos)
                _elements.push(_element);
        }
        if (_element.value && _node.elementos) {
            if (_element == _node.elementos)
                _elements.push(_element);
        }
        return _elements;
    }

    searchAnyAttributes(_id: string, _element: Element, _array: Array<Atributo>) {
        if (_element.attributes) {
            _element.attributes.forEach(attribute => {
                if (attribute.id === _id || _id === "*")
                    _array.push(attribute);
            });
        }
        if (_element.childs) {
            _element.childs.forEach(child => {
                _array = this.searchAnyAttributes(_id, child, _array,);
            });
        }
        return _array;
    }

    searchAnyText(_element: Element, _array: Array<string>) {
        if (_element.childs) {
            _element.childs.forEach(child => {
                _array = this.searchAnyText(child, _array);
            });
        }
        if (_element.value) {
            _array.push(_element.value);
        }
        return _array
    }

    searchSingleNode(_nodename: string, _element: Element, _array: Array<Element>): Array<Element> {
        if (_nodename === _element.id_open) {
            _array.push(_element);
        }
        return _array;
    }

    searchNodes(_nodename: string, _element: Element, _array: Array<Element>): Array<Element> {
        if ((_nodename === _element.id_open) || (_nodename === "*")) {
            _array.push(_element);
        }
        if (_element.childs) {
            _element.childs.forEach(child => {
                _array = this.searchNodes(_nodename, child, _array);
            });
        }
        return _array;
    }

    compareCurrent(_currentNode: Element, _array: Array<Element>, _axisname: Tipos) {
        switch (_axisname) {
            case Tipos.AXIS_ANCESTOR:
            case Tipos.AXIS_ANCESTOR_OR_SELF:
                return this.getBefore(this.tablaSimbolos[0], _currentNode, _array, true, false, false);
            case Tipos.AXIS_PRECEDING:
                return this.getBefore(this.tablaSimbolos[0], _currentNode, _array, false, true, false);
            case Tipos.AXIS_PRECEDING_SIBLING:
                return this.getBefore(this.tablaSimbolos[0], _currentNode, _array, false, true, true);
            case Tipos.AXIS_FOLLOWING:
                return this.getFollowings(this.tablaSimbolos[0], _currentNode, _array, false, false);
            case Tipos.AXIS_FOLLOWING_SIBLING:
                return this.getFollowings(this.tablaSimbolos[0], _currentNode, _array, false, true);
        }
        return _array;
    }

    getBefore(_element: Element, _currentNode: Element, _array: Array<Element>, isAncestor: boolean, isPreceding: boolean, isSibling: boolean): any {
        if (_element == _currentNode) return false;
        if (_element.childs) {
            for (let i = 0; i < _element.childs.length; i++) {
                const child = _element.childs[i];
                if (isPreceding && isSibling) _array.push(child);
                let a = this.getBefore(child, _currentNode, _array, isAncestor, isPreceding, isSibling);
                if (a === false) return _array;
            }
            if (isPreceding && !isSibling) _array.push(_element);
        }
        if (isAncestor) _array.push(_element);
        return _array;
    }

    getFollowings(_element: Element, _currentNode: Element, _array: Array<Element>, _found: boolean, isSibling: boolean): any {
        if (_element == _currentNode) _found = true;
        if (_element.childs) {
            for (let i = 0; i < _element.childs.length; i++) {
                const child = _element.childs[i];
                this.getFollowings(child, _currentNode, _array, _found, isSibling);
                return _array;
            }
            if (_found && !isSibling)
                _array.push(_element);
        }
        if (_found && isSibling) _array.push(_element);
        return _array;
    }

    searchAncestors(_element: Element, _currentNode: Element, _array: Array<Element>): any {
        if (_element == _currentNode) {
            return { found: _array };
        }
        if (_element.childs) {
            let a: any;
            for (let i = 0; i < _element.childs.length; i++) {
                const child = _element.childs[i];
                a = this.searchAncestors(child, _currentNode, _array);
                if (a.found) return a.found;
                else _array = a;
            }
        }
        _array.push(_element);
        return _array;
    }

    extractValue(_contexto: Contexto) {
        let element = _contexto.getArray()[0];
        if (element.value)
            return {
                valor: element.value,
                tipo: (!isNaN(element.value) && !isNaN(parseFloat(element.value))) ? Tipos.NUMBER : Tipos.STRING
            }
        if (element.id_open)
            return {
                valor: element.id_open,
                tipo: (!isNaN(element.id_open) && !isNaN(parseFloat(element.id_open))) ? Tipos.NUMBER : Tipos.STRING
            }
        if (element.id)
            return {
                valor: element.id,
                tipo: (!isNaN(element.id) && !isNaN(parseFloat(element.id))) ? Tipos.NUMBER : Tipos.STRING
            }
        if ((!isNaN(element) && !isNaN(parseFloat(element))))
            return {
                valor: element,
                tipo: Tipos.NUMBER
            }
        if (typeof (element) === "string")
            return {
                valor: element,
                tipo: Tipos.STRING
            }
        return null;
    }


    // Métodos para obtener la tabla de símbolos
    getArraySymbols() {
        let simbolos: Array<any> = [];
        try {
            this.tablaSimbolos.forEach(element => {
                if (element.attributes || element.childs) {
                    let dad = this.createSymbolElement(element, (element.father === null ? "global" : element.father));
                    simbolos.push(dad);
                    if (element.attributes) {
                        element.attributes.forEach(attribute => {
                            simbolos.push(this.createSymbolAttribute(attribute, element.id_open));
                        });
                    }
                    if (element.childs) {
                        simbolos.concat(this.toRunTree(simbolos, element.childs, dad.id));
                    }
                }
                else {
                    let symb = this.createSymbolElement(element, (element.father === null ? "global" : element.father));
                    simbolos.push(symb);
                }
            });
            this.tablaFunciones.forEach(funcion => {
                let symb = this.createSymbolFuncion(funcion);
                simbolos.push(symb);
            });
            this.tablaVariables.forEach(variable => {
                let symb = this.createSymbolVariable(variable);
                simbolos.push(symb);
            });
            return simbolos;
        } catch (error) {
            console.log(error);
            return simbolos;
        }
    }

    toRunTree(_symbols: Array<any>, _array: Array<Element>, _father: string) {
        _array.forEach(element => {
            if (element.attributes || element.childs) {
                let dad = this.createSymbolElement(element, _father);
                _symbols.push(dad);
                if (element.attributes) {
                    element.attributes.forEach(attribute => {
                        _symbols.push(this.createSymbolAttribute(attribute, _father + "->" + element.id_open));
                    });
                }
                if (element.childs) {
                    let concat = _father + ("->" + dad.id);
                    _symbols.concat(this.toRunTree(_symbols, element.childs, concat));
                }
            }
            else {
                let symb = this.createSymbolElement(element, _father);
                _symbols.push(symb);
            }
        });
        return _symbols;
    }

    createSymbolElement(_element: Element, _entorno: string) {
        return {
            id: _element.id_open,
            value: _element.value,
            tipo: (_element.id_close === null ? 'Tag simple' : 'Tag doble'),
            entorno: _entorno,
            linea: _element.line,
            columna: _element.column
        }
    }

    createSymbolAttribute(_attribute: Atributo, _entorno: string) {
        return {
            id: _attribute.id,
            value: _attribute.value,
            tipo: "Atributo",
            entorno: _entorno,
            linea: _attribute.line,
            columna: _attribute.column
        }
    }

    createSymbolVariable(_variable: Variable) {
        let value = (_variable.contexto) ? this.buildPath(_variable.contexto) : (_variable.valor ? _variable.valor : '');
        return {
            id: _variable.id,
            value: (value.valor) ? (value.valor) : value,
            tipo: "Variable",
            entorno: _variable.entorno,
            linea: _variable.linea,
            columna: _variable.columna
        }
    }

    createSymbolFuncion(_funcion: Funcion) {
        return {
            id: _funcion.name,
            value: "Función creada por el usuario",
            tipo: "Function",
            entorno: "local",
            linea: _funcion.linea,
            columna: _funcion.columna
        }
    }

    buildPath(_contexto: Contexto) {
        if (_contexto.elementos.length > 0)
            return "ref://" + _contexto.elementos[0].id_open;
        if (_contexto.atributos.length > 0)
            return "ref://@" + _contexto.atributos[0].id;
        if (_contexto.nodos.length > 0)
            return "ref://node()";
        if (_contexto.texto.length > 0)
            return _contexto.texto.toString();
        if (_contexto.items.length > 0)
            return _contexto.items.toString();
    }

}
