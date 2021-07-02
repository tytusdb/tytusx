var TipoBloque;

(function (TipoBloque) {
    TipoBloque[TipoBloque["INCLUDE"] = 0] = "INCLUDE";
    TipoBloque[TipoBloque["DECLARACION_S"] = 1] = "DECLARACION_S";
    TipoBloque[TipoBloque["DECLARACION_ARREGLO"] = 2] = "DECLARACION_ARREGLO";
    TipoBloque[TipoBloque["VOID"] = 3] = "VOID";
    TipoBloque[TipoBloque["MAIN"] = 4] = "MAIN";
    TipoBloque[TipoBloque["CHAR"] = 5] = "CHAR";
    TipoBloque[TipoBloque["FLOAT"] = 6] = "FLOAT";
    TipoBloque[TipoBloque["DOUBLE"] = 7] = "DOUBLE";
    TipoBloque[TipoBloque["INT"] = 8] = "INT";
    TipoBloque[TipoBloque["DECLARACION_ASIG"] = 9] = "DECLARACION_ASIG";
    TipoBloque[TipoBloque["FUNCTION"] = 10] = "FUNCTION";
    TipoBloque[TipoBloque["PARAM"] = 11] = "PARAM";
})(TipoBloque || (TipoBloque = {}));

var tipoInstr;
(function (tipoInstr) {
    tipoInstr[tipoInstr["ASIGNACION_OPERACION"] = 0] = "ASIGNACION_OPERACION";
    tipoInstr[tipoInstr["ASIGNACION_ARREGLO"] = 2] = "ASIGNACION_ARREGLO";
    tipoInstr[tipoInstr["ASIGNACION_ID_ARRAY"] = 3] = "ASIGNACION_ID_ARRAY";
    tipoInstr[tipoInstr["ETIQUETA"] = 4] = "ETIQUETA";
    tipoInstr[tipoInstr["GOTO"] = 5] = "GOTO";
    tipoInstr[tipoInstr["RETURN"] = 6] = "RETURN";
    tipoInstr[tipoInstr["IF"] = 7] = "IF";
    tipoInstr[tipoInstr["CALL"] = 8] = "CALL";
    tipoInstr[tipoInstr["PRINT"] = 9] = "PRINT";
    tipoInstr[tipoInstr["NULL"]=10]="NULL";
})(tipoInstr || (tipoInstr = {}));
