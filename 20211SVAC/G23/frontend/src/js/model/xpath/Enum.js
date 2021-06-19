"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipos = void 0;
var Tipos;
(function (Tipos) {
    //Nodename unario
    Tipos["NODENAME"] = "NODENAME";
    Tipos["STRING"] = "STRING";
    Tipos["NUMBER"] = "NUMBER";
    Tipos["ASTERISCO"] = "ASTERISCO";
    Tipos["BOOLEANO"] = "BOOLEANO";
    // Selección
    Tipos["SELECT_FROM_ROOT"] = "SELECT_FROM_ROOT";
    Tipos["SELECT_FROM_CURRENT"] = "SELECT_FROM_CURRENT";
    Tipos["SELECT_CURRENT"] = "SELECT_CURRENT";
    Tipos["SELECT_PARENT"] = "SELECT_PARENT";
    Tipos["SELECT_ATTRIBUTES"] = "SELECT_ATTRIBUTES";
    Tipos["SELECT_AXIS"] = "SELECT_AXIS";
    // Aritméticas
    Tipos["OPERACION_SUMA"] = "OPERACION_SUMA";
    Tipos["OPERACION_RESTA"] = "OPERACION_RESTA";
    Tipos["OPERACION_MULTIPLICACION"] = "OPERACION_MULTIPLICACION";
    Tipos["OPERACION_DIVISION"] = "OPERACION_DIVISION";
    Tipos["OPERACION_MODULO"] = "OPERACION_MODULO";
    Tipos["OPERACION_NEGACION_UNARIA"] = "OPERACION_NEGACION_UNARIA";
    // Relacionales
    Tipos["RELACIONAL_IGUAL"] = "RELACIONAL_IGUAL";
    Tipos["RELACIONAL_DIFERENTE"] = "RELACIONAL_DIFERENTE";
    Tipos["RELACIONAL_MENOR"] = "RELACIONAL_MENOR";
    Tipos["RELACIONAL_MENORIGUAL"] = "RELACIONAL_MENORIGUAL";
    Tipos["RELACIONAL_MAYOR"] = "RELACIONAL_MAYOR";
    Tipos["RELACIONAL_MAYORIGUAL"] = "RELACIONAL_MAYORIGUAL";
    // Logicas
    Tipos["LOGICA_OR"] = "LOGICA_OR";
    Tipos["LOGICA_AND"] = "LOGICA_AND";
    // Funciones reservadas
    Tipos["FUNCION_LAST"] = "FUNCION_LAST";
    Tipos["FUNCION_POSITION"] = "FUNCION_POSITION";
    Tipos["FUNCION_TEXT"] = "FUNCION_TEXT";
    Tipos["FUNCION_NODE"] = "FUNCION_NODE";
    // Predicado
    Tipos["PREDICATE"] = "PREDICATE";
    Tipos["EXPRESION"] = "EXPRESION";
    // Combinacional
    Tipos["UNION"] = "SEVERAL_UNION";
    // Expresiones
    Tipos["ELEMENTOS"] = "ELEMENTOS";
    Tipos["ATRIBUTOS"] = "ATRIBUTOS";
    Tipos["TEXTOS"] = "TEXTOS";
    Tipos["COMBINADO"] = "COMBINADO";
    Tipos["EXCLUDE"] = "EXCLUDE";
    // Axisnames
    Tipos["AXIS_ANCESTOR"] = "ANCESTOR";
    Tipos["AXIS_ANCESTOR_OR_SELF"] = "ANCESTOR_OR_SELF";
    Tipos["AXIS_ATTRIBUTE"] = "AXIS_ATTRIBUTE";
    Tipos["AXIS_CHILD"] = "AXIS_CHILD";
    Tipos["AXIS_DESCENDANT"] = "AXIS_DESCENDANT";
    Tipos["AXIS_DESCENDANT_OR_SELF"] = "AXIS_DESCENDANT_OR_SELF";
    Tipos["AXIS_FOLLOWING"] = "AXIS_FOLLOWING";
    Tipos["AXIS_FOLLOWING_SIBLING"] = "AXIS_FOLLOWING_SIBLING";
    Tipos["AXIS_NAMESPACE"] = "AXIS_NAMESPACE";
    Tipos["AXIS_PARENT"] = "AXIS_PARENT";
    Tipos["AXIS_PRECEDING"] = "AXIS_PRECEDING";
    Tipos["AXIS_PRECEDING_SIBLING"] = "AXIS_PRECEDING_SIBLING";
    Tipos["AXIS_SELF"] = "AXIS_SELF";
    // Default
    Tipos["NONE"] = "NONE";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
