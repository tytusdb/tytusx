var Operador;
(function (Operador) {
    Operador[Operador["SUMA"] = 0] = "SUMA";
    Operador[Operador["RESTA"] = 1] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 3] = "DIVISION";
    Operador[Operador["MODULO"] = 4] = "MODULO";
    Operador[Operador["IGUAL"] = 5] = "IGUAL";
    Operador[Operador["MENOS_UNARIO"] = 6] = "MENOS_UNARIO";
    Operador[Operador["MAYOR_QUE"] = 7] = "MAYOR_QUE";
    Operador[Operador["MENOR_QUE"] = 8] = "MENOR_QUE";
    Operador[Operador["IGUAL_IGUAL"] = 9] = "IGUAL_IGUAL";
    Operador[Operador["DIFERENTE_QUE"] = 10] = "DIFERENTE_QUE";
    Operador[Operador["OR"] = 11] = "OR";
    Operador[Operador["AND"] = 12] = "AND";
    Operador[Operador["NOT"] = 13] = "NOT";
    Operador[Operador["MAYOR_IGUAL_QUE"] = 14] = "MAYOR_IGUAL_QUE";
    Operador[Operador["MENOR_IGUAL_QUE"] = 15] = "MENOR_IGUAL_QUE";
    Operador[Operador["DESCONOCIDO"] = 16] = "DESCONOCIDO";
})(Operador || (Operador = {}));
var Operacion = /** @class */ (function () {
    function Operacion(op_izq, op_der, operacion, linea, columna) {
        this.op_izquierda = op_izq;
        this.op_derecha = op_der;
        this.operador = operacion;
        this.linea = linea;
        this.columna = columna;
    }
    Operacion.prototype.getTipo = function (ent, arbol) {
        var valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            return Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo.INT;
            }
            return Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo.NULL;
        }
        return Tipo.VOID;
    };
    Operacion.prototype.getValorImplicito = function (ent, arbol) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT) {
            var op1_1 = this.op_izquierda.getValorImplicito(ent, arbol);
            var op2_1 = this.op_derecha.getValorImplicito(ent, arbol);
            //operacion SUMA
            if (this.operador == Operador.SUMA) {
                if (typeof (op1_1 === "number") && typeof (op2_1 === "number")) {
                    return op1_1 + op2_1;
                }
                else if (op1_1 === "string" || op2_1 === "string") {
                    if (op1_1 == null)
                        op1_1 = "null";
                    if (op2_1 == null)
                        op2_1 = "null";
                    return op1_1.toString() + op2_1.toString();
                }
                else {
                    console.log(">>[ERROR]:Se están intentando sumar tipos de datos no válidos.");
                    return null;
                }
            }
            //Operacion RESTA
            else if (this.operador == Operador.RESTA) {
                if (typeof (op1_1 === "number") && typeof (op2_1 === "number")) {
                    return op1_1 - op2_1;
                }
                else {
                    console.log(">>[ERROR]:Se están intentando restar tipos de datos no válidos.");
                    return null;
                }
            }
            //Operación Multiplicacion
            else if (this.operador == Operador.MULTIPLICACION) {
                if (typeof (op1_1 === "number") && typeof (op2_1 === "number")) {
                    return op1_1 * op2_1;
                }
                else {
                    console.log(">>[ERROR]:Error de tipos de datos no permitidos realizando una multiplicación");
                    return null;
                }
            }
            //Operación División
            else if (this.operador == Operador.DIVISION) {
                if (typeof (op1_1 === "number") && typeof (op2_1 === "number")) {
                    if (op2_1 === 0) {
                        console.log(">>[ERROR]:Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        return null;
                    }
                    return op1_1 / op2_1;
                }
                else {
                    console.log(">>[ERROR]:Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //operacion Módulo
            else if (this.operador == Operador.MODULO) {
                if (typeof (op1_1 === "number") && typeof (op2_1 === "number")) {
                    if (op2_1 === 0) {
                        console.log(">>[ERROR]:Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        return null;
                    }
                    return op1_1 % op2_1;
                }
                else {
                    console.log(">>[ERROR]:Error de tipos de datos no permitidos realizando operación módulo.");
                    return null;
                }
            }
        }
        else {
            var op1_2 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.MENOS_UNARIO) {
                if (typeof (op1_2 === "number")) {
                    return -1 * op1_2;
                }
                else {
                    console.log(">>[ERROR]:Error de tipos de datos no permitidos realizando una operación unaria");
                    return null;
                }
            }
        }
        var op1 = this.op_izquierda.getValorImplicito(ent, arbol);
        var op2 = this.op_derecha.getValorImplicito(ent, arbol);
        //aqui se deben agregar las operaciones relacionales
        //deben retornar true or false
        /*--------------------IGUAL-------------------------- */
        if (this.operador == Operador.IGUAL_IGUAL) {
            if (op1 == op2) {
                return true;
            }
            else {
                return false;
            }
        }
        /*--------------------MAYOR QUE-------------------------- */
        else if (this.operador == Operador.MAYOR_QUE) {
            if (op1 > op2) {
                return true;
            }
            else {
                return false;
            }
        }
        /*--------------------MAYOR IGUAL-------------------------- */
        else if (this.operador == Operador.MAYOR_IGUAL_QUE) {
            if (op1 >= op2) {
                return true;
            }
            else {
                return false;
            }
        }
        /*--------------------MENOR QUE-------------------------- */
        else if (this.operador == Operador.MENOR_QUE) {
            if (op1 < op2) {
                return true;
            }
            else {
                return false;
            }
        }
        /*--------------------MENOR IGUAL-------------------------- */
        else if (this.operador == Operador.MENOR_IGUAL_QUE) {
            if (op1 <= op2) {
                return true;
            }
            else {
                return false;
            }
        }
        /*--------------------DIFERENTE-------------------------- */
        else if (this.operador == Operador.DIFERENTE_QUE) {
            if (op1 != op2) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return null;
        }
    };
    Operacion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return Operacion;
}());
