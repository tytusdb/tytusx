"use strict";
var Enum_1 = require("../../../../model/xpath/Enum");
function Aritmetica(_expresion, _ambito, _contexto) {
    var operators = init(_expresion.opIzq, _expresion.opDer, _ambito, _expresion.tipo, _contexto);
    if (operators.error)
        return operators;
    switch (operators.tipo) {
        case Enum_1.Tipos.OPERACION_SUMA:
            return suma(operators.op1, operators.op2);
        case Enum_1.Tipos.OPERACION_RESTA:
            return resta(operators.op1, operators.op2);
        case Enum_1.Tipos.OPERACION_MULTIPLICACION:
            return multiplicacion(operators.op1, operators.op2);
        case Enum_1.Tipos.OPERACION_DIVISION:
            return division(operators.op1, operators.op2);
        case Enum_1.Tipos.OPERACION_MODULO:
            return modulo(operators.op1, operators.op2);
        case Enum_1.Tipos.OPERACION_NEGACION_UNARIA:
            return negacionUnaria(operators.op1);
        default:
            return null;
    }
}
function init(_opIzq, _opDer, _ambito, _tipo, _contexto) {
    var Expresion = require("../Expresion");
    var op1 = Expresion(_opIzq, _ambito, _contexto);
    if (op1.error)
        return op1;
    var op2 = Expresion(_opDer, _ambito, _contexto);
    if (op2.error)
        return op2;
    var tipo = _tipo;
    if (op1.tipo === Enum_1.Tipos.FUNCION_LAST && op2.tipo === Enum_1.Tipos.NUMBER) {
        op1 = _contexto.length;
        op2 = Number(op2.valor);
    }
    else if (op1.tipo === Enum_1.Tipos.NUMBER && op2.tipo === Enum_1.Tipos.FUNCION_LAST) {
        op1 = Number(op1.valor);
        op2 = _contexto.length;
    }
    else if (op1.tipo === Enum_1.Tipos.FUNCION_POSITION && op2.tipo === Enum_1.Tipos.NUMBER) {
        op1 = _contexto.length;
        op2 = Number(op2.valor);
    }
    else if (op1.tipo === Enum_1.Tipos.NUMBER && op2.tipo === Enum_1.Tipos.FUNCION_POSITION) {
        op1 = Number(op1.valor);
        op2 = _contexto.length;
    }
    else if (op1.tipo === Enum_1.Tipos.NUMBER && op2.tipo === Enum_1.Tipos.NUMBER) {
        op1 = Number(op1.valor);
        op2 = Number(op2.valor);
    }
    else
        return { error: "Solamente se pueden operar aritméticamente valores numéricos.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna };
    return { op1: op1, op2: op2, tipo: tipo };
}
function suma(_opIzq, _opDer) {
    return {
        valor: (_opIzq + _opDer),
        tipo: Enum_1.Tipos.NUMBER,
    };
}
function resta(_opIzq, _opDer) {
    return {
        valor: (_opIzq - _opDer),
        tipo: Enum_1.Tipos.NUMBER,
    };
}
function multiplicacion(_opIzq, _opDer) {
    return {
        valor: (_opIzq * _opDer),
        tipo: Enum_1.Tipos.NUMBER,
    };
}
function division(_opIzq, _opDer) {
    return {
        valor: (_opIzq / _opDer),
        tipo: Enum_1.Tipos.NUMBER,
    };
}
function modulo(_opIzq, _opDer) {
    return {
        valor: (_opIzq % _opDer),
        tipo: Enum_1.Tipos.NUMBER,
    };
}
function negacionUnaria(_opIzq) {
    return {
        valor: (0 - _opIzq),
        tipo: Enum_1.Tipos.NUMBER,
    };
}
module.exports = Aritmetica;
