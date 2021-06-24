"use strict";
exports.__esModule = true;
exports.Operacion = exports.Operador = void 0;

var Operador;
(function (Operador) {
    Operador[Operador["SUMA"] = 0] = "SUMA";
    Operador[Operador["RESTA"] = 1] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 3] = "DIVISION";
    Operador[Operador["MODULO"] = 4] = "MODULO";
    Operador[Operador["MENOS_UNARIO"] = 5] = "MENOS_UNARIO";
    Operador[Operador["MAYOR"] = 6] = "MAYOR";
    Operador[Operador["MENOR"] = 7] = "MENOR";
    Operador[Operador["MAYOR_IGUAL"] = 8] = "MAYOR_IGUAL";
    Operador[Operador["MENOR_IGUAL"] = 9] = "MENOR_IGUAL";
    Operador[Operador["IGUALDAD"] = 10] = "IGUALDAD";
    Operador[Operador["DESIGUALDAD"] = 11] = "DESIGUALDAD";
    Operador[Operador["OR"] = 12] = "OR";
    Operador[Operador["AND"] = 13] = "AND";
    Operador[Operador["CONCATENACION"] = 14] = "CONCATENACION";
})(Operador = exports.Operador || (exports.Operador = {}));
var Operacion = /** @class */ (function () {
    function Operacion(op_izquierda, op_derecha, operacion, linea, columna) {
        this.valor = 0;
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    Operacion.prototype.getTipo = function (ent, arbol) {
        var valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return TipoXpath.BOOL;
        }
        else if (typeof (valor) === 'string') {
            return TipoXpath.CADENA;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return TipoXpath.ENTERO;
            }
            return TipoXpath.DECIMAL;
        }
        return TipoXpath.IDENTIFICADOR;
    };
    Operacion.prototype.getValorImplicito = function (ent, arbol) {
        if (this.operador !== Operador.MENOS_UNARIO) {
            var op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            var op2 = this.op_derecha.getValorImplicito(ent, arbol);
            switch (this.operador) {
                //LO HIZO LA MÁS BONITA DEL MUNDO GG
                case Operador.SUMA:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 + op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una suma");
                        return null;
                    }
                case Operador.RESTA:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 - op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una suma");
                        return null;
                    }
                case Operador.MULTIPLICACION:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 * op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una suma");
                        return null;
                    }
                case Operador.DIVISION:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        if (op2 === 0) {
                            console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                            return null;
                        }
                        return op1 / op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una suma");
                        return null;
                    }
                case Operador.MODULO:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        if (op2 === 0) {
                            console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                            return null;
                        }
                        return op1 % op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una suma");
                        return null;
                    }
                //   -----------------------------------------------------------------------------------------------------
                case Operador.MAYOR:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 > op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion mayor");
                        return null;
                    }
                case Operador.MENOR:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 < op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion menor");
                        return null;
                    }
                case Operador.MAYOR_IGUAL:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 >= op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion mayor o igual");
                        return null;
                    }
                case Operador.MENOR_IGUAL:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 <= op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion menor o igual");
                        return null;
                    }
                case Operador.IGUALDAD:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 == op2;
                    }
                    else if (typeof (op1 === "string") && typeof (op2 === "number")) {
                        return op1 == op2;
                    }
                    else if (typeof (op1 === "number") && typeof (op2 === "string")) {
                        return op1 == op2;
                    }
                    else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                        return op1 == op2;
                    }
                    else if (typeof (op1 === "number") && typeof (op2 === "boolean")) {
                        return op1 == op2;
                    }
                    else if (typeof (op1 === "boolean") && typeof (op2 === "number")) {
                        return op1 == op2;
                    }
                    else if (typeof (op1 === "boolean") && typeof (op2 === "string")) {
                        return op1 == op2;
                    }
                    else if (typeof (op1 === "string") && typeof (op2 === "boolean")) {
                        return op1 == op2;
                    }
                    else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                        return op1 == op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion de igualdad");
                        return null;
                    }
                case Operador.DESIGUALDAD:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 != op2;
                    }
                    else if (typeof (op1 === "string") && typeof (op2 === "number")) {
                        return op1 != op2;
                    }
                    else if (typeof (op1 === "number") && typeof (op2 === "string")) {
                        return op1 != op2;
                    }
                    else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                        return op1 != op2;
                    }
                    else if (typeof (op1 === "number") && typeof (op2 === "boolean")) {
                        return op1 != op2;
                    }
                    else if (typeof (op1 === "boolean") && typeof (op2 === "number")) {
                        return op1 != op2;
                    }
                    else if (typeof (op1 === "boolean") && typeof (op2 === "string")) {
                        return op1 != op2;
                    }
                    else if (typeof (op1 === "string") && typeof (op2 === "boolean")) {
                        return op1 != op2;
                    }
                    else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                        return op1 != op2;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion de desigualdad");
                        return null;
                    }
                case Operador.AND:
                /*if (typeof (op1 === "number") && typeof (op2 === "number")) {

                    return op1 && op2;
                } else {
                    console.log("Error de tipos de datos no permitidos realizando una comparacion and");
                    return null;
                }*/
                case Operador.OR:
                case Operador.CONCATENACION:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return String(op1).concat(String(op2));
                    }
                    else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                        return String(op1).concat(String(op2));
                    }
                    else if (typeof (op1 === "number") && typeof (op2 === "string")) {
                        return String(op1).concat(String(op2));
                    }
                    else if (typeof (op1 === "string") && typeof (op2 === "number")) {
                        return String(op1).concat(String(op2));
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una concatenacion");
                        return null;
                    }
                //   -----------------------------------------------------------------------------------------------------
            }
        }
        else {
            var op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.MENOS_UNARIO) {
                if (typeof (op1 === "number")) {
                    return -1 * op1;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una operación unaria");
                    return null;
                }
            }
        }
        return null;
    };
    Operacion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return Operacion;
}());
exports.Operacion = Operacion;
