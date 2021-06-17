import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";

function Logica(_expresion: any, _ambito: Ambito, _contexto: Array<any>) {
    let operators = init(_expresion.opIzq, _expresion.opDer, _ambito, _contexto, _expresion.tipo);
    if (operators.error) return operators;
    switch (operators.tipo) {
        case Tipos.LOGICA_AND:
            return and(operators.op1, operators.op2, _contexto);
        case Tipos.LOGICA_OR:
            return or(operators.op1, operators.op2, _contexto);
        default:
            return null;
    }
}

function init(_opIzq: any, _opDer: any, _ambito: Ambito, _contexto: Array<any>, _tipo: Tipos) {
    const Expresion = require("../Expresion");
    let op1 = Expresion(_opIzq, _ambito, _contexto);
    if (op1.error) return op1;
    let op2 = Expresion(_opDer, _ambito, _contexto);
    if (op2.error) return op2;
    let tipo: Tipos = _tipo;
    console.log(op1, 888, op2)
    // else return { error: "Relación lógica no aceptable.", tipo: "Semántico", origen: "Query", linea: _opIzq.linea, columna: _opIzq.columna }
    return { op1: op1, op2: op2, tipo: tipo };
}

function and(_opIzq: any, _opDer: any, _contexto: Array<any>) {

}

function or(_opIzq: any, _opDer: any, _contexto: Array<any>) {

}

export = Logica;