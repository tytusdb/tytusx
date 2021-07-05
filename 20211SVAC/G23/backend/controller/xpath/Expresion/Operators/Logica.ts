import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";
import { Contexto } from "../../../Contexto";

function Logica(_expresion: any, _ambito: Ambito, _contexto: Contexto, _id?: any) {
    let operators = init(_expresion.opIzq, _expresion.opDer, _ambito, _contexto, _expresion.tipo, _id);
    if (operators === null || operators.error) return operators;
    if (Array.isArray(operators)) return operators;
    switch (operators.tipo) {
        case Tipos.LOGICA_AND:
            return and(operators.op1, operators.op2, _contexto);
        case Tipos.LOGICA_OR:
            return or(operators.op1, operators.op2, _contexto);
        default:
            return null;
    }
}

function init(_opIzq: any, _opDer: any, _ambito: Ambito, _contexto: Contexto, _tipo: Tipos, _id?: any) {
    const Expresion = require("../Expresion");
    let op1 = Expresion(_opIzq, _ambito, _contexto, _id);
    if (op1 === null || op1.error) return op1;
    let op2 = Expresion(_opDer, _ambito, _contexto, _id);
    if (op2 === null || op2.error) return op2;
    let tipo: Tipos = _tipo;
    // console.log(op1, 888, op2)
    if (Array.isArray(op1) && Array.isArray(op2)) {
        let _or = (tipo === Tipos.LOGICA_OR) ? true : false;
        return operate(op1[0], op2[0], _or);
    }
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

function operate(op1: any, op2: any, _or: boolean) {
    if (op1.constructor.name === "Contexto") {
        return filterContext(op1, op2, _or)
    }
    else if (op1.tipo === Tipos.BOOLEANO && op2.tipo === Tipos.BOOLEANO) {
        return returnBoolean(op1, op2, _or);
    }
    else return null;
}

function returnBoolean(_val1: any, _val2: any, _or: boolean) {
    // console.log(_val1, _val2)
    switch (_or) {
        case true:
            return [{ valor: (_val1.valor || _val2.valor), tipo: Tipos.BOOLEANO }]
        case false:
            return [{ valor: (_val1.valor && _val2.valor), tipo: Tipos.BOOLEANO }]
        default:
            return null;
    }
}

function filterContext(_context1: Contexto, _context2: Contexto, _or: boolean) {
    let array1 = _context1.elementos;
    let array2 = _context2.elementos;
    let tmp: Contexto = new Contexto();
    if (_context1.variable) tmp.variable = _context1.variable;
    tmp.cadena = _context1.cadena;
    for (let i = 0; i < array1.length; i++) {
        const obj1 = array1[i];
        let val1 = (obj1.id_open) ? (obj1.id_open) : (obj1.id);
        for (let j = 0; j < array2.length; j++) {
            const obj2 = array2[j];
            let val2 = (obj2.id_open) ? (obj2.id_open) : (obj2.id);
            if (val1 == val2 || _or) {
                tmp.elementos.push(obj1);
                tmp.elementos.push(obj2);
            }
        }
    }
    tmp.removeDuplicates();
    if (!_or) {
        let min = tmp.elementos.length - Math.min(array1.length, array2.length);
        for (let i = 0; i < min; i++) {
            tmp.elementos.pop();
        }
    }
    // console.log(tmp, 3131313131)
    return [tmp];
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