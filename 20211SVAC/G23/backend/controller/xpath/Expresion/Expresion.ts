import { Ambito } from "../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../model/xpath/Enum";
import { Element } from "../../../model/xml/Element"

function Expresion(_expresion: any, _ambito: Ambito, _contexto: Array<Element>): any {
    let tipo: Tipos = _expresion.tipo;
    // console.log(_expresion, 1111111) // Agregar el caso de que sea una instrucción y abrir un bloque
    if (tipo === Tipos.EXPRESION) {
        return Expresion(_expresion.expresion, _ambito, _contexto);
    }
    else if (tipo === Tipos.NODENAME) {
        return { valor: _expresion.nodename, tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.STRING || tipo === Tipos.NUMBER) {
        return _expresion;
    }
    else if (tipo === Tipos.SELECT_CURRENT) {
        return { valor: ".", tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.SELECT_PARENT) {
        return { valor: "..", tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.SELECT_ATTRIBUTES) {
        return { valor: _expresion.expresion, tipo: Tipos.ATRIBUTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.SELECT_AXIS) {
        let nodetest = Expresion(_expresion.nodetest.expresion, _ambito, _contexto);
        if (nodetest.error) return nodetest;
        return { axisname: _expresion.axisname, nodetest: nodetest, predicate: _expresion.nodetest.predicate, tipo: Tipos.SELECT_AXIS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.ASTERISCO) {
        return { valor: "*", tipo: Tipos.ASTERISCO, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.FUNCION_NODE) {
        return { valor: "node()", tipo: Tipos.FUNCION_NODE, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.FUNCION_LAST) {
        return { valor: "last()", tipo: Tipos.FUNCION_LAST, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.FUNCION_POSITION) {
        return { valor: "position()", tipo: Tipos.FUNCION_POSITION, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.FUNCION_TEXT) {
        return { valor: "text()", tipo: Tipos.FUNCION_TEXT, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.OPERACION_SUMA || tipo === Tipos.OPERACION_RESTA || tipo === Tipos.OPERACION_MULTIPLICACION
        || tipo === Tipos.OPERACION_DIVISION || tipo === Tipos.OPERACION_MODULO || tipo === Tipos.OPERACION_NEGACION_UNARIA) {
        const Aritmetica = require("./Operators/Aritmetica");
        return Aritmetica(_expresion, _ambito, _contexto);
    }
    else if (tipo === Tipos.RELACIONAL_MAYOR || tipo === Tipos.RELACIONAL_MAYORIGUAL
        || tipo === Tipos.RELACIONAL_MENOR || tipo === Tipos.RELACIONAL_MENORIGUAL
        || tipo === Tipos.RELACIONAL_IGUAL || tipo === Tipos.RELACIONAL_DIFERENTE) {
        const Relacional = require("./Operators/Relacional");
        return Relacional(_expresion, _ambito, _contexto);
    }
    else if (tipo === Tipos.LOGICA_AND || tipo === Tipos.LOGICA_OR) {
        const Logica = require("./Operators/Logica");
        return Logica(_expresion, _ambito, _contexto);
    }
    else {
        console.log(_expresion, "Expresión no reconocida.")
        // const Bloque = require("../Instruccion/Bloque");
        // return Bloque([_expresion], _ambito, _contexto);
        return { error: "Error: Expresión no procesada.", tipo: "Semántico", origen: "Query", linea: _expresion.linea, columna: _expresion.columna };
    }
}

export = Expresion;