import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";
import { Contexto } from "../../../Contexto";
import filterElements from "./Match";

function Relacional(_expresion: any, _ambito: Ambito, _contexto: Contexto, id?: any) {
    let operators = init(_expresion.opIzq, _expresion.opDer, _ambito, _expresion.tipo, _contexto, id);
    if (operators === null || operators.error) return operators;
    if (Array.isArray(operators)) return operators;
    switch (operators.tipo) {
        case Tipos.RELACIONAL_MAYOR:
            return mayor(operators.op1, operators.op2);
        case Tipos.RELACIONAL_MAYORIGUAL:
            return mayorigual(operators.op1, operators.op2);
        case Tipos.RELACIONAL_MENOR:
            return menor(operators.op1, operators.op2);
        case Tipos.RELACIONAL_MENORIGUAL:
            return menorigual(operators.op1, operators.op2);
        case Tipos.RELACIONAL_IGUAL:
            return igual(operators.op1, operators.op2);
        case Tipos.RELACIONAL_DIFERENTE:
            return diferente(operators.op1, operators.op2);
        default:
            return null;
    }
}

function init(_opIzq: any, _opDer: any, _ambito: Ambito, _tipo: Tipos, _contexto: Contexto, id?: any) {
    const Expresion = require("../Expresion");
    let op1 = Expresion(_opIzq, _ambito, _contexto, id);
    if (op1 === null || op1.error) return op1;
    let op2 = Expresion(_opDer, _ambito, _contexto, id);
    if (op2 === null || op2.error) return op2;
    let tipo: Tipos = _tipo;

    if (op1.elementos || op2.elementos) {
        if (op1.elementos && (op2.tipo === Tipos.NUMBER || op2.tipo === Tipos.STRING))
            return filterElements(op2.valor, tipo, op1, _contexto);
        else
            return null;
    }
    // Numéricas
    if (tipo === Tipos.RELACIONAL_MAYOR || tipo === Tipos.RELACIONAL_MAYORIGUAL ||
        tipo === Tipos.RELACIONAL_MENOR || tipo === Tipos.RELACIONAL_MENORIGUAL) {
        if ((op1.tipo === Tipos.FUNCION_POSITION || op1.tipo === Tipos.FUNCION_LAST) && op2.tipo === Tipos.NUMBER) {
            op1 = _contexto.getLength();
            op2 = Number(op2.valor);
        }
        else if (op1.tipo === Tipos.NUMBER && (op2.tipo === Tipos.FUNCION_POSITION || op2.tipo === Tipos.FUNCION_LAST)) {
            op2 = Number(op1.valor);
            op1 = _contexto.getLength();
            if (_tipo === Tipos.RELACIONAL_MAYOR) tipo = Tipos.RELACIONAL_MENOR;
            if (_tipo === Tipos.RELACIONAL_MAYORIGUAL) tipo = Tipos.RELACIONAL_MENORIGUAL;
            if (_tipo === Tipos.RELACIONAL_MENOR) tipo = Tipos.RELACIONAL_MAYOR;
            if (_tipo === Tipos.RELACIONAL_MENORIGUAL) tipo = Tipos.RELACIONAL_MAYORIGUAL;
        }
        else if (op1.tipo === Tipos.ATRIBUTOS || op2.tipo === Tipos.ATRIBUTOS) {
            let opIzq = { valor: 0, tipo: op1.tipo };
            let opDer = { valor: 0, tipo: op2.tipo };
            opIzq.tipo = Tipos.ATRIBUTOS;
            opDer.tipo = (op1.tipo === Tipos.ATRIBUTOS) ? (op2.tipo) : (op1.tipo);
            if (op1.tipo === Tipos.ATRIBUTOS && (op2.tipo === Tipos.STRING || op2.tipo === Tipos.NUMBER)) {
                opIzq.valor = op1.valor;
                opDer.valor = op2.valor;
            }
            else if ((op1.tipo === Tipos.STRING || op1.tipo === Tipos.NUMBER) && op2.tipo === Tipos.ATRIBUTOS) {
                opIzq.valor = op2.valor;
                opDer.valor = op1.valor;
            }
            else return { error: "Desigualdad no compatible.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
            return { op1: opIzq, op2: opDer, tipo: tipo };
        }
        else if (op1.tipo === Tipos.NUMBER && op2.tipo === Tipos.NUMBER) {
            op1 = Number(op1.valor);
            op2 = Number(op2.valor);
        }
        else if (op1.tipo === Tipos.ELEMENTOS || op2.tipo === Tipos.ELEMENTOS) {
            if (op1.tipo === Tipos.ELEMENTOS && (op2.tipo === Tipos.STRING || op2.tipo === Tipos.NUMBER)) {
                op1 = op1.valor;
                op2 = op2.valor;
            }
            else if ((op1.tipo === Tipos.STRING || op1.tipo === Tipos.NUMBER) && op2.tipo === Tipos.ELEMENTOS) {
                let tmp = op1.valor;
                op1 = op2.valor;
                op2 = tmp;
            }
            else if (op1.tipo === Tipos.ELEMENTOS && op2.tipo === Tipos.ELEMENTOS) {
                op1 = op1.valor;
                op2 = op2.valor;
            }
            return { op1: { valor: op1, id: true }, op2: op2, tipo: tipo };
        }
        else return { error: "Solamente se pueden comparar desigualdades entre valores numéricos.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
        return { op1: op1, op2: op2, tipo: tipo };
    }
    // Numéricas o texto
    if (tipo === Tipos.RELACIONAL_IGUAL || tipo === Tipos.RELACIONAL_DIFERENTE) {
        let opIzq = { valor: 0, tipo: op1.tipo };
        let opDer = { valor: 0, tipo: op2.tipo };
        if ((op1.tipo === Tipos.FUNCION_POSITION || op1.tipo === Tipos.FUNCION_LAST) && op2.tipo === Tipos.NUMBER) {
            opIzq.valor = _contexto.getLength();
            opDer.valor = Number(op2.valor);
        }
        else if (op1.tipo === Tipos.NUMBER && (op2.tipo === Tipos.FUNCION_POSITION || op2.tipo === Tipos.FUNCION_LAST)) {
            opIzq.valor = Number(op1.valor);
            opDer.valor = _contexto.getLength();
        }
        else if (op1.tipo === Tipos.ATRIBUTOS || op2.tipo === Tipos.ATRIBUTOS) {
            opIzq.tipo = Tipos.ATRIBUTOS;
            opDer.tipo = (op1.tipo === Tipos.ATRIBUTOS) ? (op2.tipo) : (op1.tipo);
            if (op1.tipo === Tipos.ATRIBUTOS && (op2.tipo === Tipos.STRING || op2.tipo === Tipos.NUMBER)) {
                opIzq.valor = op1.valor;
                opDer.valor = op2.valor;
            }
            else if ((op1.tipo === Tipos.STRING || op1.tipo === Tipos.NUMBER) && op2.tipo === Tipos.ATRIBUTOS) {
                opIzq.valor = op2.valor;
                opDer.valor = op1.valor;
            }
            else return { error: "Igualdad no compatible.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
            return { op1: opIzq, op2: opDer, tipo: tipo };
        }
        else if (op1.tipo === Tipos.FUNCION_TEXT || op2.tipo === Tipos.FUNCION_TEXT) {
            opIzq.tipo = Tipos.FUNCION_TEXT;
            opDer.tipo = (op1.tipo === Tipos.FUNCION_TEXT) ? (op2.tipo) : (op1.tipo);
            if (op1.tipo === Tipos.FUNCION_TEXT && (op2.tipo === Tipos.STRING || op2.tipo === Tipos.NUMBER)) {
                opIzq.valor = op1.valor;
                opDer.valor = op2.valor;
            }
            else if ((op1.tipo === Tipos.STRING || op1.tipo === Tipos.NUMBER) && op2.tipo === Tipos.FUNCION_TEXT) {
                opIzq.valor = op2.valor;
                opDer.valor = op1.valor;
            }
            else return { error: "Igualdad no compatible.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
            return { op1: opIzq, op2: opDer, tipo: tipo };
        }
        else if (op1.tipo === Tipos.ELEMENTOS || op2.tipo === Tipos.ELEMENTOS) {
            if (op1.tipo === Tipos.ELEMENTOS && (op2.tipo === Tipos.STRING || op2.tipo === Tipos.NUMBER)) {
                op1 = op1.valor;
                op2 = op2.valor;
            }
            else if ((op1.tipo === Tipos.STRING || op1.tipo === Tipos.NUMBER) && op2.tipo === Tipos.ELEMENTOS) {
                let tmp = op1.valor;
                op1 = op2.valor;
                op2 = tmp;
            }
            else if (op1.tipo === Tipos.ELEMENTOS && op2.tipo === Tipos.ELEMENTOS) {
                op1 = op1.valor;
                op2 = op2.valor;
            }
        }
        else {
            return { error: "Igualdad no compatible.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
        }
        return { op1: op1, op2: op2, tipo: tipo };
    }
    return { error: "Relación no procesada.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
}

function mayor(_opIzq: any, _opDer: any) {
    if (_opIzq.id)
        return { e1: _opIzq.valor, e2: _opDer, tipo: Tipos.ELEMENTOS, desigualdad: Tipos.RELACIONAL_MAYOR }
    if (_opIzq.tipo === Tipos.ATRIBUTOS)
        return { atributo: _opIzq.valor, condicion: _opDer.valor, desigualdad: Tipos.RELACIONAL_MAYOR, tipo: Tipos.ATRIBUTOS }
    if (_opIzq.tipo === Tipos.ELEMENTOS)
        return { referencia: _opIzq.valor, condicion: _opDer.valor, desigualdad: Tipos.RELACIONAL_MAYOR, tipo: Tipos.ELEMENTOS }
    return {
        valor: (_opDer + 1),
        tipo: Tipos.RELACIONAL_MAYOR
    }
}

function mayorigual(_opIzq: any, _opDer: any) {
    if (_opIzq.id)
        return { e1: _opIzq.valor, e2: _opDer, tipo: Tipos.ELEMENTOS, desigualdad: Tipos.RELACIONAL_MAYORIGUAL }
    if (_opIzq.tipo === Tipos.ATRIBUTOS)
        return { atributo: _opIzq.valor, condicion: _opDer.valor, desigualdad: Tipos.RELACIONAL_MAYORIGUAL, tipo: Tipos.ATRIBUTOS }
    if (_opIzq.tipo === Tipos.ELEMENTOS)
        return { referencia: _opIzq.valor, condicion: _opDer.valor, desigualdad: Tipos.RELACIONAL_MAYORIGUAL, tipo: Tipos.ELEMENTOS }
    return {
        valor: _opDer,
        tipo: Tipos.RELACIONAL_MAYORIGUAL
    }
}

function menor(_opIzq: any, _opDer: any) {
    if (_opIzq.id)
        return { e1: _opIzq.valor, e2: _opDer, tipo: Tipos.ELEMENTOS, desigualdad: Tipos.RELACIONAL_MENOR }
    if (_opIzq.tipo === Tipos.ATRIBUTOS)
        return { atributo: _opIzq.valor, condicion: _opDer.valor, desigualdad: Tipos.RELACIONAL_MENOR, tipo: Tipos.ATRIBUTOS }
    if (_opIzq.tipo === Tipos.ELEMENTOS)
        return { referencia: _opIzq.valor, condicion: _opDer.valor, desigualdad: Tipos.RELACIONAL_MENOR, tipo: Tipos.ELEMENTOS }
    return {
        valor: (_opDer - 1),
        tipo: Tipos.RELACIONAL_MENOR
    }
}

function menorigual(_opIzq: any, _opDer: any) {
    if (_opIzq.id)
        return { e1: _opIzq.valor, e2: _opDer, tipo: Tipos.ELEMENTOS, desigualdad: Tipos.RELACIONAL_MENORIGUAL }
    if (_opIzq.tipo === Tipos.ATRIBUTOS)
        return { atributo: _opIzq.valor, condicion: _opDer.valor, desigualdad: Tipos.RELACIONAL_MENORIGUAL, tipo: Tipos.ATRIBUTOS }
    if (_opIzq.tipo === Tipos.ELEMENTOS)
        return { referencia: _opIzq.valor, condicion: _opDer.valor, desigualdad: Tipos.RELACIONAL_MENORIGUAL, tipo: Tipos.ELEMENTOS }
    return {
        valor: _opDer,
        tipo: Tipos.RELACIONAL_MENORIGUAL
    }
}

function igual(_opIzq: any, _opDer: any) {
    if (_opIzq.tipo === Tipos.ELEMENTOS)
        return { e1: _opIzq, e2: _opDer, tipo: Tipos.ELEMENTOS, desigualdad: Tipos.RELACIONAL_IGUAL }
    if (_opIzq.tipo === Tipos.FUNCION_POSITION || _opDer.tipo === Tipos.FUNCION_POSITION)
        return { valor: ((_opIzq.tipo === Tipos.FUNCION_POSITION) ? (_opDer.valor) : (_opIzq.valor)), tipo: Tipos.NUMBER }
    if (_opIzq.tipo === Tipos.FUNCION_LAST || _opDer.tipo === Tipos.FUNCION_LAST)
        return { valor: ((_opIzq.valor == _opDer.valor) ? (_opDer.valor) : (-1)), tipo: Tipos.NUMBER }
    if (_opIzq.tipo === Tipos.ATRIBUTOS)
        return { atributo: _opIzq.valor, condicion: _opDer.valor, tipo: Tipos.ATRIBUTOS }
    if (_opIzq.tipo === Tipos.FUNCION_TEXT)
        return { condicion: _opDer.valor, tipo: Tipos.FUNCION_TEXT }
    return { e1: _opIzq, e2: _opDer, tipo: Tipos.ELEMENTOS, desigualdad: Tipos.RELACIONAL_IGUAL }
}

function diferente(_opIzq: any, _opDer: any) {
    if (_opIzq.tipo === Tipos.ELEMENTOS)
        return { e1: _opIzq, e2: _opDer, tipo: Tipos.ELEMENTOS, desigualdad: Tipos.RELACIONAL_DIFERENTE }
    if (_opIzq.tipo === Tipos.FUNCION_POSITION || _opDer.tipo === Tipos.FUNCION_POSITION)
        return { valor: ((_opIzq.tipo === Tipos.FUNCION_POSITION) ? (_opDer.valor) : (_opIzq.valor)), tipo: Tipos.EXCLUDE }
    if (_opIzq.tipo === Tipos.FUNCION_LAST || _opDer.tipo === Tipos.FUNCION_LAST)
        return { valor: ((_opIzq.valor == _opDer.valor) ? (_opDer.valor) : (-1)), tipo: Tipos.EXCLUDE }
    if (_opIzq.tipo === Tipos.ATRIBUTOS)
        return { atributo: _opIzq.valor, condicion: _opDer.valor, exclude: true, tipo: Tipos.ATRIBUTOS }
    if (_opIzq.tipo === Tipos.FUNCION_TEXT)
        return { condicion: _opDer.valor, exclude: true, tipo: Tipos.FUNCION_TEXT }
    return { e1: _opIzq, e2: _opDer, tipo: Tipos.ELEMENTOS, desigualdad: Tipos.RELACIONAL_DIFERENTE }
}

export = Relacional;