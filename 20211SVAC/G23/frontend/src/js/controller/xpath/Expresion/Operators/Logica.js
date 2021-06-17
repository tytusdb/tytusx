"use strict";
var Enum_1 = require("../../../../model/xpath/Enum");
function Logica(_expresion, _ambito, _contexto) {
    var operators = init(_expresion.opIzq, _expresion.opDer, _ambito, _contexto, _expresion.tipo);
    if (operators.error)
        return operators;
    switch (operators.tipo) {
        case Enum_1.Tipos.LOGICA_AND:
            return and(operators.op1, operators.op2, _contexto);
        case Enum_1.Tipos.LOGICA_OR:
            return or(operators.op1, operators.op2, _contexto);
        default:
            return null;
    }
}
function init(_opIzq, _opDer, _ambito, _contexto, _tipo) {
    var Expresion = require("../Expresion");
    var op1 = Expresion(_opIzq, _ambito, _contexto);
    if (op1.error)
        return op1;
    var op2 = Expresion(_opDer, _ambito, _contexto);
    if (op2.error)
        return op2;
    var tipo = _tipo;
    console.log(op1, 888, op2);
    if (op1.tipo === Enum_1.Tipos.ELEMENTOS && op2.tipo === Enum_1.Tipos.ELEMENTOS) {
        return { op1: op1, op2: op2, tipo: tipo };
    }
    if (op1.tipo === Enum_1.Tipos.ATRIBUTOS && op2.tipo === Enum_1.Tipos.ATRIBUTOS) {
        return { op1: op1, op2: op2, tipo: tipo };
    }
    else
        return { error: "Relación lógica no aceptable.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna };
}
function and(_opIzq, _opDer, _contexto) {
    var op1 = _opIzq; // Tiene sus dos operadores y desigualdad
    var op2 = _opDer;
    var context1 = filterElements(op1.e1, op1.e2, op1.desigualdad, _contexto);
    var context2 = filterElements(op2.e1, op2.e2, op2.desigualdad, _contexto);
    var tmp = [];
    for (var i = 0; i < context1.length; i++) {
        var element1 = context1[i];
        for (var j = 0; j < context2.length; j++) {
            var element2 = context2[j];
            if (element1 == element2) {
                tmp.push(element1);
                break;
            }
        }
    }
    return { tipo: Enum_1.Tipos.LOGICA_AND, elementos: tmp };
}
function or(_opIzq, _opDer, _contexto) {
    var op1 = _opIzq; // Tiene sus dos operadores y desigualdad
    var op2 = _opDer;
    var context1 = filterElements(op1.e1, op1.e2, op1.desigualdad, _contexto);
    var context2 = filterElements(op2.e1, op2.e2, op2.desigualdad, _contexto);
    var tmp = context1.concat(context2.filter(function (item) { return context1.indexOf(item) < 0; }));
    return { tipo: Enum_1.Tipos.LOGICA_OR, elementos: tmp };
}
function filterElements(e1, e2, desigualdad, _contexto) {
    var condition = false;
    var tmp = [];
    for (var i = 0; i < _contexto.length; i++) {
        var element = _contexto[i];
        if (element.attributes) { // Hace match con un atributo
            for (var j = 0; j < element.attributes.length; j++) {
                var attribute = element.attributes[j];
                condition = verificarDesigualdad(desigualdad, attribute.id, e1, attribute.value, e2);
                if (condition) {
                    tmp.push(element);
                    break; // Sale del ciclo de atributos para pasar al siguiente elemento
                }
            }
        }
        if (element.childs && tmp.length === 0) { // Hace match con algún hijo
            for (var j = 0; j < element.childs.length; j++) {
                var child = element.childs[j];
                condition = verificarDesigualdad(desigualdad, child.id_open, e1, child.value, e2);
                if (condition) {
                    tmp.push(element);
                    break;
                }
            }
        }
        if (tmp.length === 0) { // Hace match con el elemento
            condition = verificarDesigualdad(desigualdad, element.id_open, e1, element.value, e2);
            if (condition)
                tmp.push(element);
        }
    }
    return tmp;
}
function verificarDesigualdad(_tipo, v1, e1, v2, e2) {
    switch (_tipo) {
        case Enum_1.Tipos.RELACIONAL_MAYOR:
            return (v1 == e1 && v2 > e2);
        case Enum_1.Tipos.RELACIONAL_MAYORIGUAL:
            return (v1 == e1 && v2 >= e2);
        case Enum_1.Tipos.RELACIONAL_MENOR:
            return (v1 == e1 && v2 < e2);
        case Enum_1.Tipos.RELACIONAL_MENORIGUAL:
            return (v1 == e1 && v2 <= e2);
        case Enum_1.Tipos.RELACIONAL_IGUAL:
            return (v1 == e1 && v2 == e2);
        case Enum_1.Tipos.RELACIONAL_DIFERENTE:
            return (v1 == e1 && v2 != e2);
        default:
            return false;
    }
}
module.exports = Logica;
