"use strict";
var Enum_1 = require("../../../../../model/xpath/Enum");
// Revisa el nodetest y busca hacer match
function f1(_element, _elements, _text, isDoubleBar) {
    if (_element.value) {
        _text.push(_element.value);
        _elements.push(_element);
    }
    if (_element.childs && isDoubleBar) {
        _element.childs.forEach(function (child) {
            f1(child, _elements, _text, isDoubleBar);
        });
    }
    return { elementos: _elements, texto: _text };
}
function f2(_element, _elements, _attributes, valor, isDoubleBar) {
    for (var j = 0; j < _element.attributes.length; j++) {
        var attribute = _element.attributes[j];
        if (attribute.id == valor || valor === "*") {
            _elements.push(_element);
            _attributes.push(attribute);
            break; // Sale del ciclo de atributos para pasar al siguiente elemento
        }
        if (attribute.value == valor) {
            _elements.push(_element);
            _attributes.push(attribute);
            break;
        }
    }
    if (_element.childs && isDoubleBar) {
        _element.childs.forEach(function (child) {
            f2(child, _elements, _attributes, valor, isDoubleBar);
        });
    }
    return { elementos: _elements, atributos: _attributes };
}
function f3(_element, _elements, _text, valor, tipo, isDoubleBar) {
    if (_element.id_open == valor || valor == "*") {
        if (tipo === Enum_1.Tipos.FUNCION_TEXT)
            _text.push(_element.value);
        _elements.push(_element);
    }
    if (_element.childs && isDoubleBar) {
        _element.childs.forEach(function (child) {
            f3(child, _elements, _text, valor, tipo, isDoubleBar);
        });
    }
    return { elementos: _elements, texto: _text };
}
function f4(_element, _elements, _text, valor, tipo, isDoubleBar) {
    if (_element.value == valor || valor == "*") {
        if (tipo === Enum_1.Tipos.FUNCION_TEXT)
            _text.push(_element.value);
        _elements.push(_element);
    }
    if (_element.childs && isDoubleBar) {
        _element.childs.forEach(function (child) {
            f4(child, _elements, _text, valor, tipo, isDoubleBar);
        });
    }
    return { elementos: _elements, texto: _text };
}
module.exports = { f1: f1, f2: f2, f3: f3, f4: f4 };
