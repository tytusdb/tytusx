import { Ambito } from "../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../model/xpath/Enum";
import { Contexto } from "../../Contexto";

function Expresion(_expresion: any, _ambito: Ambito, _contexto: Contexto, _id?: any): any {
    // if (!_expresion) return null;
    let tipo: Tipos = (Array.isArray(_expresion)) ? Tipos.NONE : _expresion.tipo;

    if (tipo === Tipos.EXPRESION) {
        return Expresion(_expresion.expresion, _ambito, _contexto, _id);
    }
    else if (tipo === Tipos.NODENAME) {
        return { valor: _expresion.nodename, tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.STRING || tipo === Tipos.NUMBER) {
        return _expresion;
    }
    else if (tipo === Tipos.SELECT_CURRENT) {
        let exp = _expresion.expresion;
        if (_id) {
            if (_id === exp) return { valor: ".", tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
            if (_contexto.atCounter?.id === exp) {
                let length = _contexto.getLength();
                for (let i = 1; i <= length; i++) {
                    _contexto.items.push(i);
                }
                return { valor: ".", tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
            }
            return null;
        }
        if (_contexto.existeVariable(exp) !== -1) {
            let valueFromVar = _contexto.getVar(exp);
            if (valueFromVar?.contexto) {
                _ambito.contextFromVar = valueFromVar;
                return { valor: ".", tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna, contextFromVar: valueFromVar.contexto };
            }
            else if (valueFromVar?.valor)
                return valueFromVar?.valor
        }
        if (exp !== ".") return null;
        return { valor: ".", tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.SELECT_PARENT) {
        return { valor: "..", tipo: Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.SELECT_ATTRIBUTES) {
        return { valor: _expresion.expresion, tipo: Tipos.ATRIBUTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Tipos.SELECT_AXIS) {
        let nodetest = Expresion(_expresion.nodetest.expresion, _ambito, _contexto, _id);
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
        return Aritmetica(_expresion, _ambito, _contexto, _id);
    }
    else if (tipo === Tipos.RELACIONAL_MAYOR || tipo === Tipos.RELACIONAL_MAYORIGUAL
        || tipo === Tipos.RELACIONAL_MENOR || tipo === Tipos.RELACIONAL_MENORIGUAL
        || tipo === Tipos.RELACIONAL_IGUAL || tipo === Tipos.RELACIONAL_DIFERENTE) {
        const Relacional = require("./Operators/Relacional");
        return Relacional(_expresion, _ambito, _contexto, _id);
    }
    else if (tipo === Tipos.LOGICA_AND || tipo === Tipos.LOGICA_OR) {
        const Logica = require("./Operators/Logica");
        return Logica(_expresion, _ambito, _contexto, _id);
    }
    else if (tipo === Tipos.IF_THEN_ELSE) {
        const IfConditional = require("../../xquery/If");
        return IfConditional(_expresion.condicionIf, _expresion.instruccionesThen, _expresion.instruccionesElse, _ambito, _contexto, _id);
    }
    else {
        const ExpresionQuery = require('../../xquery/Expresion/Expresion');
        return ExpresionQuery(_expresion, _ambito, _contexto, _id);
    }
}

export = Expresion;