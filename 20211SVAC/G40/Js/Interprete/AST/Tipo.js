"use strict";

var Tipo;
(function (Tipo) {
    Tipo[Tipo["STRING"] = 0] = "STRING";
    Tipo[Tipo["INT"] = 1] = "INT";
    Tipo[Tipo["DOUBLE"] = 2] = "DOUBLE";
    Tipo[Tipo["BOOL"] = 3] = "BOOL";
    Tipo[Tipo["VOID"] = 4] = "VOID";
    Tipo[Tipo["STRUCT"] = 5] = "STRUCT";
    Tipo[Tipo["NULL"] = 6] = "NULL";
    Tipo[Tipo["ARRAY"] = 7] = "ARRAY";
    Tipo[Tipo["ATRIBUTO"] = 8] = "ATRIBUTO";
})(Tipo || (Tipo = {}));

var Operador;
(function (Operador) {
    Operador[Operador["SUMA"] = 0] = "SUMA";
    Operador[Operador["RESTA"] = 1] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 3] = "DIVISION";
    Operador[Operador["MODULO"] = 4] = "MODULO";
    Operador[Operador["MENOS_UNARIO"] = 5] = "MENOS_UNARIO";
    Operador[Operador["MAYOR_QUE"] = 6] = "MAYOR_QUE";
    Operador[Operador["MENOR_QUE"] = 7] = "MENOR_QUE";
    Operador[Operador["IGUAL"] = 8] = "IGUAL";
    Operador[Operador["DIFERENTE_QUE"] = 9] = "DIFERENTE_QUE";
    Operador[Operador["OR"] = 10] = "OR";
    Operador[Operador["AND"] = 11] = "AND";
    Operador[Operador["NOT"] = 12] = "NOT";
    Operador[Operador["MAYOR_IGUAL_QUE"] = 13] = "MAYOR_IGUAL_QUE";
    Operador[Operador["MENOR_IGUAL_QUE"] = 14] = "MENOR_IGUAL_QUE";
    Operador[Operador["DESCONOCIDO"] = 15] = "DESCONOCIDO";
})(Operador || (Operador = {}));


var TipoSelector;
(function (TipoSelector) {
    TipoSelector[TipoSelector["DOBLE_SLASH"] = 0] = "DOBLE_SLASH";
    TipoSelector[TipoSelector["SLASH"] = 1] = "SLASH";
    TipoSelector[TipoSelector["DOSPUNTOS_DOSSLASH"] = 2] = "DOSPUNTOS_DOSSLASH";
    TipoSelector[TipoSelector["PUNTO_DOSSLASH"] = 3] = "PUNTO_DOSSLASH";
    TipoSelector[TipoSelector["DOSPUNTOS_SLASH"] = 4] = "DOSPUNTOS_SLASH";
    TipoSelector[TipoSelector["PUNTO_SLASH"] = 5] = "PUNTO_SLASH";
    TipoSelector[TipoSelector["FIN"] = 6] = "FIN";
})(TipoSelector || (TipoSelector = {}));

var TipoExpresionXPath;
(function (TipoExpresionXPath) {
    TipoExpresionXPath[TipoExpresionXPath["IDENTIFICADOR"] = 0] = "IDENTIFICADOR";
    TipoExpresionXPath[TipoExpresionXPath["ASTERISCO"] = 1] = "ASTERISCO";
    TipoExpresionXPath[TipoExpresionXPath["NODE"] = 2] = "NODE";
    TipoExpresionXPath[TipoExpresionXPath["TEXT"] = 3] = "TEXT";
    TipoExpresionXPath[TipoExpresionXPath["PUNTO"] = 4] = "PUNTO";
    TipoExpresionXPath[TipoExpresionXPath["DOBLEPUNTO"] = 5] = "DOBLEPUNTO";
    TipoExpresionXPath[TipoExpresionXPath["ARROBA"] = 6] = "ARROBA";
    TipoExpresionXPath[TipoExpresionXPath["ARROBA_ID"] = 7] = "ARROBA_ID";
})(TipoExpresionXPath || (TipoExpresionXPath = {}));


var TipoExpresionDefinida;
(function (TipoExpresionDefinida) {
    TipoExpresionDefinida[TipoExpresionDefinida["LAST"] = 0] = "LAST";
    TipoExpresionDefinida[TipoExpresionDefinida["POSITION"] = 1] = "POSITION";
    TipoExpresionDefinida[TipoExpresionDefinida["AXES"] = 2] = "AXES";
    TipoExpresionDefinida[TipoExpresionDefinida["ASTERISCO"] = 3] = "ASTERISCO";
    TipoExpresionDefinida[TipoExpresionDefinida["ARROBA"] = 4] = "ARROBA";
    TipoExpresionDefinida[TipoExpresionDefinida["NODE"] = 5] = "NODE";
    TipoExpresionDefinida[TipoExpresionDefinida["TEXT"] = 6] = "TEXT";
})(TipoExpresionDefinida || (TipoExpresionDefinida = {}));


var TipoNodo;
(function (TipoNodo) {
    TipoNodo[TipoNodo["SELECTOR_EXPRESION"] = 0] = "SELECTOR_EXPRESION";
    TipoNodo[TipoNodo["EXPRESION"] = 1] = "EXPRESION";
    TipoNodo[TipoNodo["AXES"] = 2] = "AXES";
    TipoNodo[TipoNodo["SELECTOR_AXES"] = 3] = "SELECTOR_AXES";
    TipoNodo[TipoNodo["FIN"] = 4] = "FIN";
})(TipoNodo || (TipoNodo = {}));

var TipoAxes;
(function (TipoAxes) {
    TipoAxes[TipoAxes["ANCESTOR"] = 0] = "ANCESTOR";
    TipoAxes[TipoAxes["ANCESTOR_OR_SELF"] = 1] = "ANCESTOR_OR_SELF";
    TipoAxes[TipoAxes["ATTRIBUTE"] = 2] = "ATTRIBUTE";
    TipoAxes[TipoAxes["CHILD"] = 3] = "CHILD";
    TipoAxes[TipoAxes["DESCENDANT"] = 4] = "DESCENDANT";
    TipoAxes[TipoAxes["DESCENDANT_OR_SELF"] = 5] = "DESCENDANT_OR_SELF";
    TipoAxes[TipoAxes["FOLLOWING"] = 6] = "FOLLOWING";
    TipoAxes[TipoAxes["FOLLOWING_SIBLING"] = 7] = "FOLLOWING_SIBLING";
    TipoAxes[TipoAxes["PARENT"] = 8] = "PARENT";
    TipoAxes[TipoAxes["PRECEDING"] = 9] = "PRECEDING";
    TipoAxes[TipoAxes["PRECEDING_SIBLING"] = 10] = "PRECEDING_SIBLING";
    TipoAxes[TipoAxes["SELF"] = 11] = "SELF";
    TipoAxes[TipoAxes["NINGUNO"] = 12] = "NINGUNO";
})(TipoAxes || (TipoAxes = {}));

var TipoOperadores;
(function (TipoOperadores) {
    TipoOperadores[TipoOperadores["ELEMENTOS"] = 0] = "ELEMENTOS";
    TipoOperadores[TipoOperadores["ATRIBUTOS"] = 1] = "ATRIBUTOS";
})(TipoOperadores || (TipoOperadores = {}));