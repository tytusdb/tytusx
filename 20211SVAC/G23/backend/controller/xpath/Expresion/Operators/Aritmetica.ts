import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";
import { Contexto } from "../../../Contexto";

function Aritmetica(_expresion: any, _ambito: Ambito, _contexto: Contexto) {
    let operators = init(_expresion.opIzq, _expresion.opDer, _ambito, _expresion.tipo, _contexto);
    if (operators === null || operators.error) return operators;
    switch (operators.tipo) {
        case Tipos.OPERACION_SUMA:
            return suma(operators.op1, operators.op2);
        case Tipos.OPERACION_RESTA:
            return resta(operators.op1, operators.op2);
        case Tipos.OPERACION_MULTIPLICACION:
            return multiplicacion(operators.op1, operators.op2);
        case Tipos.OPERACION_DIVISION:
            return division(operators.op1, operators.op2);
        case Tipos.OPERACION_MODULO:
            return modulo(operators.op1, operators.op2);
        case Tipos.OPERACION_NEGACION_UNARIA:
            return negacionUnaria(operators.op1);
        default:
            return null;
    }
}

function init(_opIzq: any, _opDer: any, _ambito: Ambito, _tipo: Tipos, _contexto: Contexto) {
    const Expresion = require("../Expresion");
    let op1 = Expresion((Array.isArray(_opIzq)) ? (_opIzq[0]) : (_opIzq), _ambito, _contexto);
    if (op1 === null || op1.error) return op1;
    let op2 = Expresion((Array.isArray(_opDer)) ? (_opDer[0]) : (_opDer), _ambito, _contexto);
    if (op2 === null || op2.error) return op2;
    let tipo: Tipos = _tipo;
    if (op1.tipo === Tipos.FUNCION_LAST && op2.tipo === Tipos.NUMBER) {
        op1 = _contexto.getLength();
        op2 = Number(op2.valor);
    }
    else if (op1.tipo === Tipos.NUMBER && op2.tipo === Tipos.FUNCION_LAST) {
        op1 = Number(op1.valor);
        op2 = _contexto.getLength();
    }
    else if (op1.tipo === Tipos.FUNCION_POSITION && op2.tipo === Tipos.NUMBER) {
        op1 = _contexto.getLength();
        op2 = Number(op2.valor);
    }
    else if (op1.tipo === Tipos.NUMBER && op2.tipo === Tipos.FUNCION_POSITION) {
        op1 = Number(op1.valor);
        op2 = _contexto.getLength();
    }
    else if (op1.tipo === Tipos.NUMBER && op2.tipo === Tipos.NUMBER) {
        op1 = Number(op1.valor);
        op2 = Number(op2.valor);
    }
    else return { error: "Solamente se pueden operar aritméticamente valores numéricos.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
    return { op1: op1, op2: op2, tipo: tipo };
}

function suma(_opIzq: any, _opDer: any) {
    return {
        valor: (_opIzq + _opDer),
        tipo: Tipos.NUMBER,
    }
}

function resta(_opIzq: number, _opDer: number) {
    return {
        valor: (_opIzq - _opDer),
        tipo: Tipos.NUMBER,
    }
}

function multiplicacion(_opIzq: number, _opDer: number) {
    return {
        valor: (_opIzq * _opDer),
        tipo: Tipos.NUMBER,
    }
}

function division(_opIzq: number, _opDer: number) {
    if (_opDer == 0) return { error: "No es permitida la división entre 0." };
    return {
        valor: (_opIzq / _opDer),
        tipo: Tipos.NUMBER,
    }
}

function modulo(_opIzq: number, _opDer: number) {
    if (_opDer == 0) return { error: "No es permitido módulo entre 0." };
    return {
        valor: (_opIzq % _opDer),
        tipo: Tipos.NUMBER,
    }
}

function negacionUnaria(_opIzq: number) {
    return {
        valor: (0 - _opIzq),
        tipo: Tipos.NUMBER,
    }
}

export =  Aritmetica;