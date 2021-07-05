import { Expresion } from "../Interfaces/Expresion";
import { Tipo } from "./Tipo";

export enum Operador {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    MENOS_UNARIO,
    MAYOR_QUE,
    MENOR_QUE,
    IGUAL_IGUAL,
    DIFERENTE_QUE,
    OR,
    AND,
    NOT,
    MAYOR_IGUA_QUE,
    MENOR_IGUA_QUE,
    DESCONOCIDO
}

export class Relacion implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;

    constructor(op_izquierda: Expresion, op_derecha: Expresion, operacion: Operador, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }

    getTipo(arbol: any): Tipo {
        const valor = this.getValorImplicito(arbol);
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
    }


    getValorImplicito(arbol: any) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT) {
            let op1 = this.op_izquierda.getValorImplicito(arbol);
            let op2 = this.op_derecha.getValorImplicito(arbol);

            //menorque
            if (this.operador == Operador.MENOR_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 < op2;
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
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
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
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
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
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
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
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
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
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
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
                    return !(op1.ToString() === op2.ToString());
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }

        } else {
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

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }
}