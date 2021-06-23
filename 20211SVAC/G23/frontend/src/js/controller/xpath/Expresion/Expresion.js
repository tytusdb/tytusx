"use strict";
var Enum_1 = require("../../../model/xpath/Enum");
function Expresion(_expresion, _ambito, _contexto) {
    var tipo = _expresion.tipo;
    // console.log(_expresion, 1111111) // Agregar el caso de que sea una instrucción y abrir un bloque
    if (tipo === Enum_1.Tipos.EXPRESION) {
        return Expresion(_expresion.expresion, _ambito, _contexto);
    }
    else if (tipo === Enum_1.Tipos.NODENAME) {
        return { valor: _expresion.nodename, tipo: Enum_1.Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.STRING || tipo === Enum_1.Tipos.NUMBER) {
        return _expresion;
    }
    else if (tipo === Enum_1.Tipos.SELECT_CURRENT) {
        return { valor: ".", tipo: Enum_1.Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.SELECT_PARENT) {
        return { valor: "..", tipo: Enum_1.Tipos.ELEMENTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.SELECT_ATTRIBUTES) {
        return { valor: _expresion.expresion, tipo: Enum_1.Tipos.ATRIBUTOS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.SELECT_AXIS) {
        var nodetest = Expresion(_expresion.nodetest.expresion, _ambito, _contexto);
        if (nodetest.error)
            return nodetest;
        return { axisname: _expresion.axisname, nodetest: nodetest, predicate: _expresion.nodetest.predicate, tipo: Enum_1.Tipos.SELECT_AXIS, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.ASTERISCO) {
        return { valor: "*", tipo: Enum_1.Tipos.ASTERISCO, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.FUNCION_NODE) {
        return { valor: "node()", tipo: Enum_1.Tipos.FUNCION_NODE, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.FUNCION_LAST) {
        return { valor: "last()", tipo: Enum_1.Tipos.FUNCION_LAST, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.FUNCION_POSITION) {
        return { valor: "position()", tipo: Enum_1.Tipos.FUNCION_POSITION, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.FUNCION_TEXT) {
        return { valor: "text()", tipo: Enum_1.Tipos.FUNCION_TEXT, linea: _expresion.linea, columna: _expresion.columna };
    }
    else if (tipo === Enum_1.Tipos.OPERACION_SUMA || tipo === Enum_1.Tipos.OPERACION_RESTA || tipo === Enum_1.Tipos.OPERACION_MULTIPLICACION
        || tipo === Enum_1.Tipos.OPERACION_DIVISION || tipo === Enum_1.Tipos.OPERACION_MODULO || tipo === Enum_1.Tipos.OPERACION_NEGACION_UNARIA) {
        var Aritmetica = require("./Operators/Aritmetica");
        return Aritmetica(_expresion, _ambito, _contexto);
    }
    else if (tipo === Enum_1.Tipos.RELACIONAL_MAYOR || tipo === Enum_1.Tipos.RELACIONAL_MAYORIGUAL
        || tipo === Enum_1.Tipos.RELACIONAL_MENOR || tipo === Enum_1.Tipos.RELACIONAL_MENORIGUAL
        || tipo === Enum_1.Tipos.RELACIONAL_IGUAL || tipo === Enum_1.Tipos.RELACIONAL_DIFERENTE) {
        var Relacional = require("./Operators/Relacional");
        return Relacional(_expresion, _ambito, _contexto);
    }
    else if (tipo === Enum_1.Tipos.LOGICA_AND || tipo === Enum_1.Tipos.LOGICA_OR) {
        var Logica = require("./Operators/Logica");
        return Logica(_expresion, _ambito, _contexto);
    }
    else {
        console.log(_expresion, "Expresión no reconocida.");
        // const Bloque = require("../Instruccion/Bloque");
        // return Bloque([_expresion], _ambito, _contexto);
        return { error: "Error: Expresión no procesada.", tipo: "Semántico", origen: "Query", linea: _expresion.linea, columna: _expresion.columna };
    }
}
module.exports = Expresion;
