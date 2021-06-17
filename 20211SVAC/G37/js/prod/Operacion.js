
var Operador;
(function (Operador) {
    Operador[Operador["ENTERO"] = 0] = "ENTERO";
    Operador[Operador["DECIMAL"] = 1] = "DECIMAL";
    Operador[Operador["CADENA"] = 2] = "CADENA";
    Operador[Operador["SUMA"] = 3] = "SUMA";
    Operador[Operador["RESTA"] = 4] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 5] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 6] = "DIVISION";
    Operador[Operador["MODULO"] = 7] = "MODULO";
    Operador[Operador["MENOS_UNARIO"] = 8] = "MENOS_UNARIO";
    Operador[Operador["MAYOR_QUE"] = 9] = "MAYOR_QUE";
    Operador[Operador["MENOR_QUE"] = 10] = "MENOR_QUE";
    Operador[Operador["IGUAL_IGUAL"] = 11] = "IGUAL_IGUAL";
    Operador[Operador["DIFERENTE_QUE"] = 12] = "DIFERENTE_QUE";
    Operador[Operador["OR"] = 13] = "OR";
    Operador[Operador["AND"] = 14] = "AND";
    Operador[Operador["NOT"] = 15] = "NOT";
    Operador[Operador["MAYOR_IGUA_QUE"] = 16] = "MAYOR_IGUA_QUE";
    Operador[Operador["MENOR_IGUA_QUE"] = 17] = "MENOR_IGUA_QUE";
    Operador[Operador["DESCONOCIDO"] = 18] = "DESCONOCIDO";
    Operador[Operador["NODO"] = 19] = "NODO";
    Operador[Operador["AXE"] = 20] = "AXE";
    Operador[Operador["POR_WILDCARD"] = 21] = "POR_WILDCARD";
    Operador[Operador["POR"] = 22] = "POR";
    Operador[Operador["DOT"] = 23] = "DOT";
    Operador[Operador["DOUBLE_DOT"] = 24] = "DOUBLE_DOT";
})(Operador = exports.Operador || (exports.Operador = {}));
var Operacion = /** @class */ (function () {
    function Operacion(op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    Operacion.prototype.getTipo = function (ent, arbol) {
        var valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'string') {
            return Tipo_1.Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo_1.Tipo.INT;
            }
            return Tipo_1.Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo_1.Tipo.NULL;
        }
        return Tipo_1.Tipo.NULL;
    };
    Operacion.prototype.getValorImplicito = function (ent, arbol) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT && this.operador !== Operador.NODO) {
            var op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            var op2 = this.op_derecha.getValorImplicito(ent, arbol);
            //suma
            if (this.operador == Operador.SUMA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 + op2;
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null)
                        op1 = "null";
                    if (op2 == null)
                        op2 = "null";
                    return op1.ToString() + op2.ToString();
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //resta
            else if (this.operador == Operador.RESTA) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 - op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 * op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //division
            else if (this.operador == Operador.DIVISION) {
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
            }
            //modulo
            else if (this.operador == Operador.MODULO) {
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
            }
        }
        else {
            var op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.NODO) {
                return op1;
            }
            else if (this.operador == Operador.MENOS_UNARIO) {
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
