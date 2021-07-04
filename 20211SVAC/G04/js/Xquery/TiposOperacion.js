var tiposOperando;
(function (tiposOperando) {
    //ARITMETICO
    tiposOperando[tiposOperando["SUMA"] = 1] = "SUMA";
    tiposOperando[tiposOperando["RESTA"] = 2] = "RESTA";
    tiposOperando[tiposOperando["MULTIPLICACION"] = 3] = "MULTIPLICACION";
    tiposOperando[tiposOperando["DIVISION"] = 4] = "DIVISION";
    tiposOperando[tiposOperando["MOD"] = 5] = "MOD";
    //RELACIONALES
    tiposOperando[tiposOperando["IGUAL"] = 6] = "IGUAL";
    tiposOperando[tiposOperando["MAYOR"] = 7] = "MAYOR";
    tiposOperando[tiposOperando["MAYOR_IGUAL"] = 8] = "MAYOR_IGUAL";
    tiposOperando[tiposOperando["MENOR"] = 9] = "MENOR";
    tiposOperando[tiposOperando["MENOR_IGUAL"] = 10] = "MENOR_IGUAL";
    tiposOperando[tiposOperando["DIFERENTE"] = 11] = "DIFERENTE";
    //LOGICOS
    tiposOperando[tiposOperando["AND"] = 12] = "AND";
    tiposOperando[tiposOperando["OR"] = 13] = "OR";
    tiposOperando[tiposOperando["NEGADO"] = 14] = "NEGADO";
})(tiposOperando || (tiposOperando = {}));
