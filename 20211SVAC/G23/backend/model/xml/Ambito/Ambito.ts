import { Atributo } from "../Atributo";
import { Element } from "../Element";

export class Ambito {

    anterior: Ambito;
    tipo: string;
    tablaSimbolos: Array<Element>;

    constructor(_anterior: any, _tipo: string) {
        this.anterior = _anterior
        this.tipo = _tipo
        this.tablaSimbolos = [];
    }

    isGlobal(): boolean {
        return this.tipo === "global";
    }

    addSimbolo(_simbolo: Element) {
        this.tablaSimbolos.push(_simbolo);
    }

    nodesFunction(_element: Element, _nodes: Array<any>): Array<any> { // Todos los descendientes (con textos)
        _nodes.push({ elementos: _element });
        if (_element.childs) {
            _element.childs.forEach(child => {
                _nodes = this.nodesFunction(child, _nodes);
            });
        }
        if (_element.value) {
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
                }
            });
        }
        return _elements;
    }

    searchAnyAttributes(_element: Element, _array: Array<Atributo>, _elements: Array<Element>) {
        if (_element.attributes) {
            _element.attributes.forEach(attribute => {
                _array.push(attribute);
            });
            _elements.push(_element);
        }
        if (_element.childs) {
            _element.childs.forEach(child => {
                _array = this.searchAnyAttributes(child, _array, _elements).atributos;
            });
        }
        return { atributos: _array, elementos: _elements };
    }

    searchAttributesFromCurrent(_element: Element, _id: string, _array: Array<Atributo>, _elements: Array<Element>) {
        let flag: boolean = false;
        if (_element.attributes) {
            _element.attributes.forEach(attribute => {
                if (attribute.id === _id) {
                    _array.push(attribute);
                    flag = true;
                }
            });
            if (flag) {
                _elements.push(_element);
                flag = false;
            }
        }
        if (_element.childs) {
            _element.childs.forEach(child => {
                _array = this.searchAttributesFromCurrent(child, _id, _array, _elements).atributos;
            });
        }
        return { atributos: _array, elementos: _elements };
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

    getGlobal() {
        let e: Ambito;
        for (e = this; e != null; e = e.anterior) {
            if (e.anterior === null)
                return e;
        }
        return null
    }


    // Métodos para obtener la tabla de símbolos
    getArraySymbols() {
        let simbolos: any = [];
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
        let type = (_element.id_close === null ? 'Tag simple' : 'Tag doble');
        var symb = {
            id: _element.id_open,
            value: _element.value,
            tipo: type,
            entorno: _entorno,
            linea: _element.line,
            columna: _element.column
        }
        return symb;
    }

    createSymbolAttribute(_attribute: Atributo, _entorno: string) {
        var symb = {
            id: _attribute.id,
            value: _attribute.value,
            tipo: "Atributo",
            entorno: _entorno,
            linea: _attribute.line,
            columna: _attribute.column
        }
        return symb;
    }

}
