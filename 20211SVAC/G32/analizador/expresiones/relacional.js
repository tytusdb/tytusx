"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacion = exports.Operador = void 0;
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
    Operador[Operador["IGUAL_IGUAL"] = 8] = "IGUAL_IGUAL";
    Operador[Operador["DIFERENTE_QUE"] = 9] = "DIFERENTE_QUE";
    Operador[Operador["OR"] = 10] = "OR";
    Operador[Operador["AND"] = 11] = "AND";
    Operador[Operador["NOT"] = 12] = "NOT";
    Operador[Operador["MAYOR_IGUA_QUE"] = 13] = "MAYOR_IGUA_QUE";
    Operador[Operador["MENOR_IGUA_QUE"] = 14] = "MENOR_IGUA_QUE";
    Operador[Operador["DESCONOCIDO"] = 15] = "DESCONOCIDO";
})(Operador = exports.Operador || (exports.Operador = {}));
class Relacion {
    constructor(op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    getTipo(arbol) {
        const valor = this.getValorImplicito(arbol);
        if (typeof (valor) === 'boolean') {
            return 3 /* BOOL */;
        }
        else if (typeof (valor) === 'string') {
            return 0 /* STRING */;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return 1 /* INT */;
            }
            return 2 /* DOUBLE */;
        }
        else if (valor === null) {
            return 5 /* NULL */;
        }
        return 4 /* VOID */;
    }
    getValorImplicito(arbol) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT) {
            let op1 = this.op_izquierda.getValorImplicito(arbol);
            let op2 = this.op_derecha.getValorImplicito(arbol);
            //menorque
            if (this.operador == Operador.MENOR_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 < op2;
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null)
                        op1 = "null";
                    if (op2 == null)
                        op2 = "null";
                    return op1.ToString() < op2.ToString();
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //mayorque
            else if (this.operador == Operador.MAYOR_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 > op2;
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null)
                        op1 = "null";
                    if (op2 == null)
                        op2 = "null";
                    return op1.ToString() > op2.ToString();
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //menorigual
            else if (this.operador == Operador.MENOR_IGUA_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 <= op2;
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null)
                        op1 = "null";
                    if (op2 == null)
                        op2 = "null";
                    return op1.ToString() <= op2.ToString();
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //mayorigual
            else if (this.operador == Operador.MAYOR_IGUA_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 >= op2;
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null)
                        op1 = "null";
                    if (op2 == null)
                        op2 = "null";
                    return op1.ToString() >= op2.ToString();
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //igual
            else if (this.operador == Operador.IGUAL_IGUAL) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 === op2;
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null)
                        op1 = "null";
                    if (op2 == null)
                        op2 = "null";
                    return op1.ToString() === op2.ToString();
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //diferente
            else if (this.operador == Operador.DIFERENTE_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return !(op1 === op2);
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null)
                        op1 = "null";
                    if (op2 == null)
                        op2 = "null";
                    return !(op1.ToString() === op2.ToString());
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
        }
        else {
            let op1 = this.op_izquierda.getValorImplicito(arbol);
            if (this.operador == Operador.NOT) {
                if (typeof (op1 === "number")) {
                    return !op1;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una operación unaria");
                    return null;
                }
            }
        }
        return null;
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
}
exports.Relacion = Relacion;
