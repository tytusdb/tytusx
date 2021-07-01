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
    Operador[Operador["SUMA"] = 9] = "SUMA";
    Operador[Operador["RESTA"] = 10] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 11] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 12] = "DIVISION";
    Operador[Operador["MODULO"] = 13] = "MODULO";
    Operador[Operador["MENOS_UNARIO"] = 14] = "MENOS_UNARIO";
    Operador[Operador["MAYOR_QUE"] = 15] = "MAYOR_QUE";
    Operador[Operador["MENOR_QUE"] = 16] = "MENOR_QUE";
    Operador[Operador["IGUAL"] = 17] = "IGUAL";
    Operador[Operador["DIFERENTE_QUE"] = 18] = "DIFERENTE_QUE";
    Operador[Operador["OR"] = 19] = "OR";
    Operador[Operador["AND"] = 20] = "AND";
    Operador[Operador["NOT"] = 21] = "NOT";
    Operador[Operador["MAYOR_IGUAL_QUE"] = 22] = "MAYOR_IGUAL_QUE";
    Operador[Operador["MENOR_IGUAL_QUE"] = 23] = "MENOR_IGUAL_QUE";
    Operador[Operador["DESCONOCIDO"] = 24] = "DESCONOCIDO";
})(Operador || (Operador = {}));


var TipoSelector;
(function (TipoSelector) {
    TipoSelector[TipoSelector["DOBLE_SLASH"] = 25] = "DOBLE_SLASH";
    TipoSelector[TipoSelector["SLASH"] = 26] = "SLASH";
    TipoSelector[TipoSelector["DOSPUNTOS_DOSSLASH"] = 27] = "DOSPUNTOS_DOSSLASH";
    TipoSelector[TipoSelector["PUNTO_DOSSLASH"] = 28] = "PUNTO_DOSSLASH";
    TipoSelector[TipoSelector["DOSPUNTOS_SLASH"] = 29] = "DOSPUNTOS_SLASH";
    TipoSelector[TipoSelector["PUNTO_SLASH"] = 30] = "PUNTO_SLASH";
    TipoSelector[TipoSelector["FIN"] = 31] = "FIN";
})(TipoSelector || (TipoSelector = {}));

var TipoExpresionXPath;
(function (TipoExpresionXPath) {
    TipoExpresionXPath[TipoExpresionXPath["IDENTIFICADOR"] = 32] = "IDENTIFICADOR";
    TipoExpresionXPath[TipoExpresionXPath["ASTERISCO"] = 33] = "ASTERISCO";
    TipoExpresionXPath[TipoExpresionXPath["NODE"] = 34] = "NODE";
    TipoExpresionXPath[TipoExpresionXPath["TEXT"] = 35] = "TEXT";
    TipoExpresionXPath[TipoExpresionXPath["PUNTO"] = 36] = "PUNTO";
    TipoExpresionXPath[TipoExpresionXPath["DOBLEPUNTO"] = 37] = "DOBLEPUNTO";
    TipoExpresionXPath[TipoExpresionXPath["ARROBA"] = 38] = "ARROBA";
    TipoExpresionXPath[TipoExpresionXPath["ARROBA_ID"] = 39] = "ARROBA_ID";
})(TipoExpresionXPath || (TipoExpresionXPath = {}));


var TipoExpresionDefinida;
(function (TipoExpresionDefinida) {
    TipoExpresionDefinida[TipoExpresionDefinida["LAST"] = 40] = "LAST";
    TipoExpresionDefinida[TipoExpresionDefinida["POSITION"] = 41] = "POSITION";
    TipoExpresionDefinida[TipoExpresionDefinida["AXES"] = 42] = "AXES";
    TipoExpresionDefinida[TipoExpresionDefinida["ASTERISCO"] = 43] = "ASTERISCO";
    TipoExpresionDefinida[TipoExpresionDefinida["ARROBA"] = 44] = "ARROBA";
    TipoExpresionDefinida[TipoExpresionDefinida["NODE"] = 45] = "NODE";
    TipoExpresionDefinida[TipoExpresionDefinida["TEXT"] = 46] = "TEXT";
})(TipoExpresionDefinida || (TipoExpresionDefinida = {}));


var TipoNodo;
(function (TipoNodo) {
    TipoNodo[TipoNodo["SELECTOR_EXPRESION"] = 47] = "SELECTOR_EXPRESION";
    TipoNodo[TipoNodo["EXPRESION"] = 48] = "EXPRESION";
    TipoNodo[TipoNodo["AXES"] = 49] = "AXES";
    TipoNodo[TipoNodo["SELECTOR_AXES"] = 50] = "SELECTOR_AXES";
    TipoNodo[TipoNodo["FIN"] = 51] = "FIN";
})(TipoNodo || (TipoNodo = {}));

var TipoAxes;
(function (TipoAxes) {
    TipoAxes[TipoAxes["ANCESTOR"] = 52] = "ANCESTOR";
    TipoAxes[TipoAxes["ANCESTOR_OR_SELF"] = 53] = "ANCESTOR_OR_SELF";
    TipoAxes[TipoAxes["ATTRIBUTE"] = 54] = "ATTRIBUTE";
    TipoAxes[TipoAxes["CHILD"] = 55] = "CHILD";
    TipoAxes[TipoAxes["DESCENDANT"] = 56] = "DESCENDANT";
    TipoAxes[TipoAxes["DESCENDANT_OR_SELF"] = 57] = "DESCENDANT_OR_SELF";
    TipoAxes[TipoAxes["FOLLOWING"] = 58] = "FOLLOWING";
    TipoAxes[TipoAxes["FOLLOWING_SIBLING"] = 59] = "FOLLOWING_SIBLING";
    TipoAxes[TipoAxes["PARENT"] = 60] = "PARENT";
    TipoAxes[TipoAxes["PRECEDING"] = 61] = "PRECEDING";
    TipoAxes[TipoAxes["PRECEDING_SIBLING"] = 62] = "PRECEDING_SIBLING";
    TipoAxes[TipoAxes["SELF"] = 63] = "SELF";
    TipoAxes[TipoAxes["NINGUNO"] = 64] = "NINGUNO";
})(TipoAxes || (TipoAxes = {}));

var TipoOperadores;
(function (TipoOperadores) {
    TipoOperadores[TipoOperadores["ELEMENTOS"] = 65] = "ELEMENTOS";
    TipoOperadores[TipoOperadores["ATRIBUTOS"] = 66] = "ATRIBUTOS";
})(TipoOperadores || (TipoOperadores = {}));

var TipoOperadores;
(function (TipoOperadores) {
    TipoOperadores[TipoOperadores["ELEMENTOS"] = 65] = "ELEMENTOS";
    TipoOperadores[TipoOperadores["ATRIBUTOS"] = 66] = "ATRIBUTOS";
})(TipoOperadores || (TipoOperadores = {}));

var TipoSentencia;
(function (TipoSentencia) {
    TipoSentencia[TipoSentencia["WHERE"] = 67] = "WHERE";
    TipoSentencia[TipoSentencia["ORDERBY"] = 68] = "ORDERBY";
    TipoSentencia[TipoSentencia["ORDERBY_ELEMENTO"] = 69] = "ORDERBY_ELEMENTO";
    TipoSentencia[TipoSentencia["ORDERBY_ATRIBUTO"] = 70] = "ORDERBY_ATRIBUTO";
    TipoSentencia[TipoSentencia["RETURN"] = 71] = "RETURN";
    TipoSentencia[TipoSentencia["LET"] = 72] = "LET";
    TipoSentencia[TipoSentencia["NULL"] = 73] = "NULL";
})(TipoSentencia  || (TipoSentencia = {}));

var TipoXInstruccion;
(function (TipoXInstruccion) {
    TipoXInstruccion[TipoXInstruccion["XPATH"] = 74] = "XPATH";
    TipoXInstruccion[TipoXInstruccion["XNUMBER"] = 75] = "XNUMBER";
    TipoXInstruccion[TipoXInstruccion["XFLOWER"] = 76] = "XFLOWER";
    TipoXInstruccion[TipoXInstruccion["XLOWER"] = 77] = "XLOWER";
    TipoXInstruccion[TipoXInstruccion["XUPPER"] = 78] = "XUPPER";
    TipoXInstruccion[TipoXInstruccion["XSTRING"] = 79] = "XSTRING";
    TipoXInstruccion[TipoXInstruccion["XSUBSTRING"] = 80] = "XSUBSTRING";
    TipoXInstruccion[TipoXInstruccion["XFOR"] = 81] = "XFOR";
    TipoXInstruccion[TipoXInstruccion["XDECLARARFUNCION"] = 82] = "XDECLARARFUNCION";
    TipoXInstruccion[TipoXInstruccion["XLLAMADARFUNCION"] = 83] = "XLLAMADARFUNCION";
})(TipoXInstruccion || (TipoXInstruccion = {}));


var TipoXPrimitivo;
(function (TipoXPrimitivo) {
    TipoXPrimitivo[TipoXPrimitivo["NUMERO"] = 84] = "NUMERO";
    TipoXPrimitivo[TipoXPrimitivo["IDENTIFICADOR"] = 85] = "IDENTIFICADOR";
    TipoXPrimitivo[TipoXPrimitivo["CADENA"] = 86] = "CADENA";
    TipoXPrimitivo[TipoXPrimitivo["IDFLOWER"] = 87] = "IDFLOWER";
})(TipoXPrimitivo || (TipoXPrimitivo = {}));

var TipoXIF;
(function (TipoXIF) {
    TipoXIF[TipoXIF["IF"] = 88] = "IF";
    TipoXIF[TipoXIF["IFELSE"] = 89] = "IFELSE";
})(TipoXIF || (TipoXIF = {}));

var TipoXDataType;
(function (TipoXDataType) {
    TipoXDataType[TipoXDataType["INTEGER"] = 90] = "INTEGER";
    TipoXDataType[TipoXDataType["DOUBLE"] = 91] = "DOUBLE";
    TipoXDataType[TipoXDataType["FLOAT"] = 92] = "FLOAT";
    TipoXDataType[TipoXDataType["BOOLEAN"] = 93] = "BOOLEAN";
    TipoXDataType[TipoXDataType["STRING"] = 94] = "STRING";
})(TipoXDataType || (TipoXDataType = {}));

var TipoXValor;
(function (TipoXValor) {
    TipoXValor[TipoXValor["PRIMITIVO"] = 95] = "PRIMITIVO";
    TipoXValor[TipoXValor["XPATH"] = 96] = "XPATH";
})(TipoXValor || (TipoXValor = {}));