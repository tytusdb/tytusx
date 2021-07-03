"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Enum_1 = require("../../../../model/xpath/Enum");
var Expresion_1 = __importDefault(require("../../Expresion/Expresion"));
var Predicate_1 = require("./Predicate");
var Axis_1 = __importDefault(require("./Axis/Axis"));
function DobleEje(_instruccion, _ambito, _contexto) {
    var _404 = { notFound: "No se encontraron elementos." };
    var contexto = (_contexto.elementos) ? (_contexto) : null;
    var expresion;
    if (_instruccion.expresion.expresion)
        expresion = Expresion_1.default(_instruccion.expresion.expresion, _ambito, contexto);
    else
        expresion = Expresion_1.default(_instruccion.expresion, _ambito, contexto);
    if (expresion.error)
        return expresion;
    var predicate = _instruccion.expresion.predicate;
    var root;
    if (expresion.tipo === Enum_1.Tipos.ELEMENTOS) {
        root = getAllSymbolFromCurrent(expresion.valor, contexto, _ambito, predicate);
    }
    else if (expresion.tipo === Enum_1.Tipos.ATRIBUTOS) {
        root = getAllSymbolFromCurrent({ id: expresion.valor, tipo: "@" }, contexto, _ambito, predicate);
        if (root.atributos.error)
            return root.atributos;
        if (root.atributos.length === 0)
            return _404;
        return root;
    }
    else if (expresion.tipo === Enum_1.Tipos.ASTERISCO) {
        root = getAllSymbolFromCurrent(expresion.valor, contexto, _ambito, predicate);
    }
    else if (expresion.tipo === Enum_1.Tipos.FUNCION_NODE) {
        root = getAllSymbolFromCurrent(expresion.valor, contexto, _ambito, predicate);
        if (root.nodos.error)
            return root.nodos;
        if (root.nodos.length === 0)
            return _404;
    }
    else if (expresion.tipo === Enum_1.Tipos.FUNCION_TEXT) {
        root = getAllSymbolFromCurrent(expresion.valor, contexto, _ambito, predicate);
        if (root.texto.error)
            return root.texto;
        if (root.texto.length === 0)
            return _404;
    }
    else if (expresion.tipo === Enum_1.Tipos.SELECT_AXIS) {
        root = Axis_1.default.GetAxis(expresion.axisname, expresion.nodetest, expresion.predicate, contexto, _ambito, true);
        if (root.error)
            return root;
        return root;
    }
    else {
        return { error: "Expresión no válida.", tipo: "Semántico", origen: "Query", linea: _instruccion.linea, columna: _instruccion.columna };
    }
    if (root === null || root.error || root.elementos.error || root.elementos.length === 0)
        return _404;
    return root;
}
function getAllSymbolFromCurrent(_nodename, _contexto, _ambito, _condicion) {
    if (_contexto)
        return getFromCurrent(_nodename, _contexto, _ambito, _condicion);
    else
        return { error: "Indstrucción no procesada.", tipo: "Semántico", origen: "Query", linea: 1, columna: 1 };
}
function getFromCurrent(_id, _contexto, _ambito, _condicion) {
    var elements = Array();
    var attributes = Array();
    var nodes = Array();
    // Selecciona únicamente el texto contenido en el nodo y todos sus descendientes
    if (_id === "text()") {
        var text = Array();
        for (var i = 0; i < _contexto.elementos.length; i++) {
            var element = _contexto.elementos[i];
            text = _ambito.searchAnyText(element, text);
            elements.push(element);
        }
        if (_condicion) {
            var filter = new Predicate_1.Predicate(_condicion, _ambito, elements);
            text = filter.filterElements(text);
            elements = filter.contexto;
        }
        return { texto: text, elementos: elements, cadena: Enum_1.Tipos.TEXTOS };
    }
    // Selecciona todos los descencientes (elementos y/o texto)
    else if (_id === "node()") {
        for (var i = 0; i < _contexto.elementos.length; i++) {
            var element = _contexto.elementos[i];
            if (element.childs) {
                element.childs.forEach(function (child) {
                    nodes = _ambito.nodesFunction(child, nodes);
                });
            }
            else if (element.value)
                nodes.push({ textos: element.value });
            elements.push(element);
        }
        if (_condicion) {
            var filter = new Predicate_1.Predicate(_condicion, _ambito, elements);
            nodes = filter.filterElements(nodes);
            elements = filter.contexto;
        }
        return { cadena: Enum_1.Tipos.COMBINADO, nodos: nodes, elementos: _contexto.elementos };
    }
    // Selecciona todos los atributos a partir del contexto
    else if (_id.tipo === "@") {
        for (var i = 0; i < _contexto.elementos.length; i++) {
            var element = _contexto.elementos[i];
            attributes = _ambito.searchAnyAttributes(_id.id, element, attributes);
        }
        if (_condicion) {
            var filter = new Predicate_1.Predicate(_condicion, _ambito, elements);
            attributes = filter.filterAttributes(attributes);
        }
        return { atributos: attributes, elementos: [], cadena: Enum_1.Tipos.ATRIBUTOS };
    }
    // Selecciona el padre
    else if (_id === "..") {
        if (_contexto.atributos) {
            var _loop_1 = function (i) {
                var attribute = _contexto.atributos[i];
                _ambito.tablaSimbolos.forEach(function (elm) {
                    elements = _ambito.searchDadFromAttribute(elm, attribute, elements);
                });
            };
            for (var i = 0; i < _contexto.atributos.length; i++) {
                _loop_1(i);
            }
            if (_condicion) {
                var filter = new Predicate_1.Predicate(_condicion, _ambito, elements);
                elements = filter.filterElements(elements);
            }
            return { elementos: elements, cadena: Enum_1.Tipos.ELEMENTOS };
        }
        var _loop_2 = function (i) {
            var element = _contexto.elementos[i];
            var dad = element.father;
            if (dad) {
                _ambito.tablaSimbolos.forEach(function (elm) {
                    if (elm.id_open === dad.id && elm.line == dad.line && elm.column == dad.column)
                        elements.push(elm);
                    if (elm.childs)
                        elm.childs.forEach(function (child) {
                            elements = _ambito.searchDad(child, dad.id, dad.line, dad.column, elements);
                        });
                });
            }
        };
        for (var i = 0; i < _contexto.elementos.length; i++) {
            _loop_2(i);
        }
        if (_condicion) {
            var filter = new Predicate_1.Predicate(_condicion, _ambito, elements);
            elements = filter.filterElements(elements);
        }
        return { elementos: elements, cadena: Enum_1.Tipos.ELEMENTOS };
    }
    // Selecciona todos los descendientes con el id o en el caso que sea //*
    else {
        for (var i = 0; i < _contexto.elementos.length; i++) {
            var element = _contexto.elementos[i];
            if (element.childs)
                element.childs.forEach(function (child) {
                    elements = _ambito.searchNodes(_id, child, elements);
                });
        }
        if (_condicion) {
            var filter = new Predicate_1.Predicate(_condicion, _ambito, elements);
            elements = filter.filterElements(elements);
        }
        return { elementos: elements, cadena: Enum_1.Tipos.ELEMENTOS };
    }
}
module.exports = DobleEje;
