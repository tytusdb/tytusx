"use strict";
var TIPO_OPERACION;
(function (TIPO_OPERACION) {
    TIPO_OPERACION[TIPO_OPERACION["OP_SUMA"] = 0] = "OP_SUMA";
    TIPO_OPERACION[TIPO_OPERACION["OP_RESTA"] = 1] = "OP_RESTA";
    TIPO_OPERACION[TIPO_OPERACION["OP_MULTIPLICACION"] = 2] = "OP_MULTIPLICACION";
    TIPO_OPERACION[TIPO_OPERACION["OP_DIVISION"] = 3] = "OP_DIVISION";
    TIPO_OPERACION[TIPO_OPERACION["OP_MODULAR"] = 4] = "OP_MODULAR";
    TIPO_OPERACION[TIPO_OPERACION["OP_MAYOR_QUE"] = 5] = "OP_MAYOR_QUE";
    TIPO_OPERACION[TIPO_OPERACION["OP_MENOR_QUE"] = 6] = "OP_MENOR_QUE";
    TIPO_OPERACION[TIPO_OPERACION["OP_MAYOR_IGUAL"] = 7] = "OP_MAYOR_IGUAL";
    TIPO_OPERACION[TIPO_OPERACION["OP_MENOR_IGUAL"] = 8] = "OP_MENOR_IGUAL";
    TIPO_OPERACION[TIPO_OPERACION["OP_IGUAL"] = 9] = "OP_IGUAL";
    TIPO_OPERACION[TIPO_OPERACION["OP_NO_IGUAL"] = 10] = "OP_NO_IGUAL";
    TIPO_OPERACION[TIPO_OPERACION["OP_AND"] = 11] = "OP_AND";
    TIPO_OPERACION[TIPO_OPERACION["OP_OR"] = 12] = "OP_OR";
    TIPO_OPERACION[TIPO_OPERACION["OP_NOT"] = 13] = "OP_NOT";
})(TIPO_OPERACION || (TIPO_OPERACION = {}));
;
var TIPO_EXPRESION;
(function (TIPO_EXPRESION) {
    TIPO_EXPRESION[TIPO_EXPRESION["OP_ARITMETICA"] = 0] = "OP_ARITMETICA";
    TIPO_EXPRESION[TIPO_EXPRESION["OP_UNARIA"] = 1] = "OP_UNARIA";
    TIPO_EXPRESION[TIPO_EXPRESION["OP_LOGICA"] = 2] = "OP_LOGICA";
    TIPO_EXPRESION[TIPO_EXPRESION["OP_RELACIONAL"] = 3] = "OP_RELACIONAL";
})(TIPO_EXPRESION || (TIPO_EXPRESION = {}));
var TIPO_PRIMITIVO;
(function (TIPO_PRIMITIVO) {
    TIPO_PRIMITIVO[TIPO_PRIMITIVO["NUMERICO"] = 0] = "NUMERICO";
    TIPO_PRIMITIVO[TIPO_PRIMITIVO["CADENA"] = 1] = "CADENA";
})(TIPO_PRIMITIVO || (TIPO_PRIMITIVO = {}));
function nodoOperacionBinaria(operandoIzq, operandoDer, tipo, clase, fila, columna) {
    return {
        operandoIzq: operandoIzq,
        operandoDer: operandoDer,
        tipo_operacion: tipo,
        fila: fila,
        columna: columna,
        clase: clase
    };
}
function nodoDato(valor, tipo) {
    return {
        valor: valor,
        tipo_primitivo: tipo,
        dato: false
    };
}
function getValor(exp, ts) {
    if (exp.clase === TIPO_EXPRESION.OP_ARITMETICA) {
        var exp1 = getValor(exp.operandoIzq, ts);
        var exp2 = getValor(exp.operandoDer, ts);
        var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if (exp1 === "error" || exp2 === "error" || tipo1 === "error" || tipo2 === "error") {
            return "error";
        }
        if (exp.tipo_operacion === TIPO_OPERACION.OP_SUMA) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 + exp2;
            }
            else if (tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA) {
                return exp1 + exp2;
            }
            else {
                return "error";
            }
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_RESTA) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 - exp2;
            }
            else {
                return "error";
            }
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MULTIPLICACION) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 * exp2;
            }
            else {
                return "error";
            }
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_DIVISION) {
            if (exp2 != 0) {
                if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                    return exp1 / exp2;
                }
                else {
                    return "error";
                }
            }
            return "error";
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MODULAR) {
            if (exp2 != 0) {
                if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                    return exp1 % exp2;
                }
                else {
                    return "error";
                }
            }
            return "error";
        }
    }
    else if (exp.clase === TIPO_EXPRESION.OP_RELACIONAL) {
        var exp1 = getValor(exp.operandoIzq, ts);
        var exp2 = getValor(exp.operandoDer, ts);
        var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if (exp1 === "error" || exp2 === "error" || tipo1 === "error" || tipo2 === "error") {
            return "error";
        }
        if (exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_QUE) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 > exp2;
            }
            else {
                return "error";
            }
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_QUE) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 < exp2;
            }
            else {
                return "error";
            }
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_IGUAL) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 >= exp2;
            }
            else {
                return "error";
            }
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_IGUAL) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 <= exp2;
            }
            else {
                return "error";
            }
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_NO_IGUAL) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 != exp2;
            }
            else if (tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA) {
                return exp1 != exp2;
            }
            else {
                return "error";
            }
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_IGUAL) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return exp1 == exp2;
            }
            else if (tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA) {
                return exp1 == exp2;
            }
            else {
                return "error";
            }
        }
        else {
            return "error";
        }
    }
    else if (exp.clase === TIPO_EXPRESION.OP_LOGICA) {
        var exp1 = getValor(exp.operandoIzq, ts);
        var exp2 = getValor(exp.operandoDer, ts);
        var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if (exp1 === "error" || exp2 === "error" || tipo1 === "error" || tipo2 === "error") {
            return "error";
        }
        if (exp.tipo_operacion === TIPO_OPERACION.OP_AND) {
            var res = exp1 && exp2;
            return res;
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_OR) {
            var res = exp1 || exp2;
            return res;
        }
    }
    else if (exp.tipo_primitivo === TIPO_PRIMITIVO.NUMERICO || exp.tipo_primitivo === TIPO_PRIMITIVO.CADENA) {
        return exp.valor;
    }
}
function getTipo(exp, ts) {
    if (exp.clase === TIPO_EXPRESION.OP_ARITMETICA) {
        var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if (tipo1 === "error" || tipo2 === "error") {
            return "error";
        }
        if (exp.tipo_operacion === TIPO_OPERACION.OP_SUMA || exp.tipo_operacion === TIPO_OPERACION.OP_RESTA || exp.tipo_operacion === TIPO_OPERACION.OP_MULTIPLICACION) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return TIPO_PRIMITIVO.NUMERICO;
            }
            else if (tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA) {
                return TIPO_PRIMITIVO.CADENA;
            }
            return "error";
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_DIVISION || exp.tipo_operacion === TIPO_OPERACION.OP_MODULAR) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return TIPO_PRIMITIVO.NUMERICO;
            }
            else if (tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA) {
                return TIPO_PRIMITIVO.CADENA;
            }
            return "error";
        }
    }
    else if (exp.clase === TIPO_EXPRESION.OP_RELACIONAL) {
        var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if (tipo1 === "error" || tipo2 === "error") {
            return "error";
        }
        if (exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_QUE || exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_QUE || exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_IGUAL) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return TIPO_PRIMITIVO.NUMERICO;
            }
            else if (tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA) {
                return TIPO_PRIMITIVO.CADENA;
            }
            return "error";
        }
        else if (exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_IGUAL || exp.tipo_operacion === TIPO_OPERACION.OP_NO_IGUAL || exp.tipo_operacion === TIPO_OPERACION.OP_IGUAL) {
            if (tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO) {
                return TIPO_PRIMITIVO.NUMERICO;
            }
            else if (tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA) {
                return TIPO_PRIMITIVO.CADENA;
            }
            return "error";
        }
        else {
            return "error";
        }
    }
    else if (exp.clase === TIPO_EXPRESION.OP_LOGICA) {
        var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if (tipo1 === "error" || tipo2 === "error") {
            return "error";
        }
        if (exp.tipo_operacion === TIPO_OPERACION.OP_AND || exp.tipo_operacion === TIPO_OPERACION.OP_OR) {
            return; //VALIDAR TIPO OPERACION LOGICA
        }
    }
    else if (exp.tipo_primitivo == TIPO_PRIMITIVO.NUMERICO) {
        return exp.tipo_primitivo;
    }
    else if (exp.tipo_primitivo == TIPO_PRIMITIVO.CADENA) {
        return exp.tipo_primitivo;
    }
}
function graficar() {
    return 0;
}
