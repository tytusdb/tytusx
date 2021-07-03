import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";
import { Contexto } from "../../../Contexto";

function Logica(_expresion: any, _ambito: Ambito, _contexto: Contexto) {
    let operators = init(_expresion.opIzq, _expresion.opDer, _ambito, _contexto, _expresion.tipo);
    if (operators === null || operators.error) return operators;
    switch (operators.tipo) {
        case Tipos.LOGICA_AND:
            return and(operators.op1, operators.op2, _contexto);
        case Tipos.LOGICA_OR:
            return or(operators.op1, operators.op2, _contexto);
        default:
            return null;
    }
}

function init(_opIzq: any, _opDer: any, _ambito: Ambito, _contexto: Contexto, _tipo: Tipos) {
    const Expresion = require("../Expresion");
    let op1 = Expresion((Array.isArray(_opIzq)) ? (_opIzq[0]) : (_opIzq), _ambito, _contexto);
    if (op1 === null || op1.error) return op1;
    let op2 = Expresion((Array.isArray(_opDer)) ? (_opDer[0]) : (_opDer), _ambito, _contexto);
    if (op2 === null || op2.error) return op2;
    let tipo: Tipos = _tipo;
    // console.log(op1, 888, op2)
    if (op1.tipo === Tipos.ELEMENTOS && op2.tipo === Tipos.ELEMENTOS) {
        return { op1: op1, op2: op2, tipo: tipo };
    }
    if (op1.tipo === Tipos.ATRIBUTOS && op2.tipo === Tipos.ATRIBUTOS) {
        return { op1: op1, op2: op2, tipo: tipo };
    }
    else return { error: "Relación lógica no aceptable.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
}

function and(_opIzq: any, _opDer: any, _contexto: Contexto) {
    const op1 = _opIzq; // Tiene sus dos operadores y desigualdad
    const op2 = _opDer;
    let context1 = filterElements(op1.e1, op1.e2, op1.desigualdad, _contexto);
    let context2 = filterElements(op2.e1, op2.e2, op2.desigualdad, _contexto);
    let tmp = [];
    for (let i = 0; i < context1.length; i++) {
        const element1 = context1[i];
        for (let j = 0; j < context2.length; j++) {
            const element2 = context2[j];
            if (element1 == element2) {
                tmp.push(element1);
                break;
            }
        }
    }
    return { tipo: Tipos.LOGICA_AND, elementos: tmp };
}

function or(_opIzq: any, _opDer: any, _contexto: Contexto) {
    const op1 = _opIzq; // Tiene sus dos operadores y desigualdad
    const op2 = _opDer;
    let context1 = filterElements(op1.e1, op1.e2, op1.desigualdad, _contexto);
    let context2 = filterElements(op2.e1, op2.e2, op2.desigualdad, _contexto);
    let tmp = context1.concat(context2.filter((item) => context1.indexOf(item) < 0))
    return { tipo: Tipos.LOGICA_OR, elementos: tmp };
}

function filterElements(e1: any, e2: any, desigualdad: Tipos, _contexto: Contexto): Array<any> {
    let condition: boolean = false;
    let array = _contexto.getArray();
    let tmp = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.attributes) { // Hace match con un atributo
            for (let j = 0; j < element.attributes.length; j++) {
                const attribute = element.attributes[j];
                condition = verificarDesigualdad(desigualdad, attribute.id, e1, attribute.value, e2);
                if (condition) {
                    tmp.push(element);
                    break; // Sale del ciclo de atributos para pasar al siguiente elemento
                }
            }
        }
        if (element.childs) { // Hace match con algún hijo
            for (let j = 0; j < element.childs.length; j++) {
                const child = element.childs[j];
                condition = verificarDesigualdad(desigualdad, child.id_open, e1, child.value, e2);
                // console.log(desigualdad, child.id_open, e1, child.value, e2);
                if (condition) {
                    tmp.push(element);
                    break;
                }
            }
        }
        if (element.id_open) {
            condition = verificarDesigualdad(desigualdad, element.id_open, e1, element.value, e2); // Hace match con el elemento
            if (condition)
                tmp.push(element);
        }
        else if (element.value) {
            condition = verificarDesigualdad(desigualdad, element.id, e1, element.value, e2); // Hace match con el elemento
            if (condition)
                tmp.push(element);
        }
    }
    return tmp;
}

function verificarDesigualdad(_tipo: Tipos, v1: any, e1: any, v2: any, e2: any): boolean {
    switch (_tipo) {
        case Tipos.RELACIONAL_MAYOR:
            return (v1 == e1 && v2 > e2);
        case Tipos.RELACIONAL_MAYORIGUAL:
            return (v1 == e1 && v2 >= e2);
        case Tipos.RELACIONAL_MENOR:
            return (v1 == e1 && v2 < e2);
        case Tipos.RELACIONAL_MENORIGUAL:
            return (v1 == e1 && v2 <= e2);
        case Tipos.RELACIONAL_IGUAL:
            return (v1 == e1 && v2 == e2);
        case Tipos.RELACIONAL_DIFERENTE:
            return (v1 == e1 && v2 != e2);
        default:
            return false;
    }
}

export = Logica;