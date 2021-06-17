"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambito = void 0;
var Ambito = /** @class */ (function () {
    function Ambito(_anterior, _tipo) {
        this.anterior = _anterior;
        this.tipo = _tipo;
        this.tablaSimbolos = [];
    }
    Ambito.prototype.isGlobal = function () {
        return this.tipo === "global";
    };
    Ambito.prototype.addSimbolo = function (_simbolo) {
        this.tablaSimbolos.push(_simbolo);
    };
    Ambito.prototype.nodesFunction = function (_element, _nodes) {
        var _this = this;
        _nodes.push({ elementos: _element });
        if (_element.childs) {
            _element.childs.forEach(function (child) {
                _nodes = _this.nodesFunction(child, _nodes);
            });
        }
        if (_element.value) {
            _nodes.push({ textos: _element.value });
        }
        return _nodes;
    };
    Ambito.prototype.searchDad = function (_element, _nodename, _line, _column, _elements) {
        var _this = this;
        if (_element.childs) {
            _element.childs.forEach(function (child) {
                _elements = _this.searchDad(child, _nodename, _line, _column, _elements);
            });
        }
        if (_nodename === _element.id_open && _element.line == _line && _element.column == _column) {
            _elements.push(_element);
        }
        return _elements;
    };
    Ambito.prototype.searchDadFromAttribute = function (_element, _attribute, _elements) {
        var _this = this;
        if (_element.childs) {
            _element.childs.forEach(function (child) {
                _elements = _this.searchDadFromAttribute(child, _attribute, _elements);
            });
        }
        if (_element.attributes) {
            _element.attributes.forEach(function (attr) {
                if (attr.id === _attribute.id && attr.line == _attribute.line && attr.column == _attribute.column) {
                    _elements.push(_element);
                }
            });
        }
        return _elements;
    };
    Ambito.prototype.searchAnyAttributes = function (_element, _array, _elements) {
        var _this = this;
        if (_element.attributes) {
            _element.attributes.forEach(function (attribute) {
                _array.push(attribute);
            });
            _elements.push(_element);
        }
        if (_element.childs) {
            _element.childs.forEach(function (child) {
                _array = _this.searchAnyAttributes(child, _array, _elements).atributos;
            });
        }
        return { atributos: _array, elementos: _elements };
    };
    Ambito.prototype.searchAttributesFromCurrent = function (_element, _id, _array, _elements) {
        var _this = this;
        var flag = false;
        if (_element.attributes) {
            _element.attributes.forEach(function (attribute) {
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
            _element.childs.forEach(function (child) {
                _array = _this.searchAttributesFromCurrent(child, _id, _array, _elements).atributos;
            });
        }
        return { atributos: _array, elementos: _elements };
    };
    Ambito.prototype.searchSingleNode = function (_nodename, _element, _array) {
        if (_nodename === _element.id_open) {
            _array.push(_element);
        }
        return _array;
    };
    Ambito.prototype.searchNodes = function (_nodename, _element, _array) {
        var _this = this;
        if ((_nodename === _element.id_open) || (_nodename === "*")) {
            _array.push(_element);
        }
        if (_element.childs) {
            _element.childs.forEach(function (child) {
                _array = _this.searchNodes(_nodename, child, _array);
            });
        }
        return _array;
    };
    Ambito.prototype.getGlobal = function () {
        var e;
        for (e = this; e != null; e = e.anterior) {
            if (e.anterior === null)
                return e;
        }
        return null;
    };
    // Métodos para obtener la tabla de símbolos
    Ambito.prototype.getArraySymbols = function () {
        var _this = this;
        var simbolos = [];
        try {
            this.tablaSimbolos.forEach(function (element) {
                if (element.attributes || element.childs) {
                    var dad = _this.createSymbolElement(element, (element.father === null ? "global" : element.father));
                    simbolos.push(dad);
                    if (element.attributes) {
                        element.attributes.forEach(function (attribute) {
                            simbolos.push(_this.createSymbolAttribute(attribute, element.id_open));
                        });
                    }
                    if (element.childs) {
                        simbolos.concat(_this.toRunTree(simbolos, element.childs, dad.id));
                    }
                }
                else {
                    var symb = _this.createSymbolElement(element, (element.father === null ? "global" : element.father));
                    simbolos.push(symb);
                }
            });
            return simbolos;
        }
        catch (error) {
            console.log(error);
            return simbolos;
        }
    };
    Ambito.prototype.toRunTree = function (_symbols, _array, _father) {
        var _this = this;
        _array.forEach(function (element) {
            if (element.attributes || element.childs) {
                var dad = _this.createSymbolElement(element, _father);
                _symbols.push(dad);
                if (element.attributes) {
                    element.attributes.forEach(function (attribute) {
                        _symbols.push(_this.createSymbolAttribute(attribute, _father + "->" + element.id_open));
                    });
                }
                if (element.childs) {
                    var concat = _father + ("->" + dad.id);
                    _symbols.concat(_this.toRunTree(_symbols, element.childs, concat));
                }
            }
            else {
                var symb = _this.createSymbolElement(element, _father);
                _symbols.push(symb);
            }
        });
        return _symbols;
    };
    Ambito.prototype.createSymbolElement = function (_element, _entorno) {
        var type = (_element.id_close === null ? 'Tag simple' : 'Tag doble');
        var symb = {
            id: _element.id_open,
            value: _element.value,
            tipo: type,
            entorno: _entorno,
            linea: _element.line,
            columna: _element.column
        };
        return symb;
    };
    Ambito.prototype.createSymbolAttribute = function (_attribute, _entorno) {
        var symb = {
            id: _attribute.id,
            value: _attribute.value,
            tipo: "Atributo",
            entorno: _entorno,
            linea: _attribute.line,
            columna: _attribute.column
        };
        return symb;
    };
    return Ambito;
}());
exports.Ambito = Ambito;
