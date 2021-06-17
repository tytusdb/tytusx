
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../INTERFACES/Expresion";

export enum Operador {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    MENOS_UNARIO,
    MAYOR,
    MENOR,
    MAYOR_IGUAL,
    MENOR_IGUAL,
    IGUALDAD,
    DESIGUALDAD,
    OR,
    AND,
    CONCATENACION
}

export class Operacion implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;
    valor:any=0;

    constructor(op_izquierda: Expresion, op_derecha: Expresion, operacion: Operador, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            return Tipo.CADENA;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo.ENTERO;
            }
            return Tipo.DECIMAL;
        }
        return Tipo.IDENTIFICADOR;
    }


    getValorImplicito(ent: Entorno, arbol: AST) {
        if (this.operador !== Operador.MENOS_UNARIO) {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);

            switch (this.operador) {
                //LO HIZO LA MÁS BONITA DEL MUNDO GG
                case Operador.SUMA:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 + op2;
                    } else {
                        console.log("Error de tipos de datos no permitidos realizando una suma");
                        return null;
                    }
                case Operador.RESTA:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 - op2;
                    } else {
                        console.log("Error de tipos de datos no permitidos realizando una suma");
                        return null;
                    }
                case Operador.MULTIPLICACION:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 * op2;
                    } else {
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
                    } else {
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
                    } else {
                        console.log("Error de tipos de datos no permitidos realizando una suma");
                        return null;
                    }
                //   -----------------------------------------------------------------------------------------------------
                case Operador.MAYOR:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 > op2;
                    } else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion mayor");
                        return null;
                    }
                case Operador.MENOR:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 < op2;
                    } else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion menor");
                        return null;
                    }
                case Operador.MAYOR_IGUAL:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 >= op2;
                    } else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion mayor o igual");
                        return null;
                    }
                case Operador.MENOR_IGUAL:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 <= op2;
                    } else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion menor o igual");
                        return null;
                    }
                case Operador.IGUALDAD:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 == op2;
                    } else if (typeof (op1 === "string") && typeof (op2 === "number")) {
                        return op1 == op2;
                    } else if (typeof (op1 === "number") && typeof (op2 === "string")) {
                        return op1 == op2;
                    } else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                        return op1 == op2;
                    } else if (typeof (op1 === "number") && typeof (op2 === "boolean")) {
                        return op1 == op2;
                    } else if (typeof (op1 === "boolean") && typeof (op2 === "number")) {
                        return op1 == op2;
                    } else if (typeof (op1 === "boolean") && typeof (op2 === "string")) {
                        return op1 == op2;
                    } else if (typeof (op1 === "string") && typeof (op2 === "boolean")) {
                        return op1 == op2;
                    } else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                        return op1 == op2;
                    } else {
                        console.log("Error de tipos de datos no permitidos realizando una comparacion de igualdad");
                        return null;
                    }
                case Operador.DESIGUALDAD:
                    if (typeof (op1 === "number") && typeof (op2 === "number")) {
                        return op1 != op2;
                    } else if (typeof (op1 === "string") && typeof (op2 === "number")) {
                        return op1 != op2;
                    } else if (typeof (op1 === "number") && typeof (op2 === "string")) {
                        return op1 != op2;
                    } else if (typeof (op1 === "string") && typeof (op2 === "string")) {
                        return op1 != op2;
                    } else if (typeof (op1 === "number") && typeof (op2 === "boolean")) {
                        return op1 != op2;
                    } else if (typeof (op1 === "boolean") && typeof (op2 === "number")) {
                        return op1 != op2;
                    } else if (typeof (op1 === "boolean") && typeof (op2 === "string")) {
                        return op1 != op2;
                    } else if (typeof (op1 === "string") && typeof (op2 === "boolean")) {
                        return op1 != op2;
                    } else if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                        return op1 != op2;
                    } else {
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
                    }else if(typeof(op1 === "string") && typeof (op2 === "string")){
                        return String(op1).concat(String(op2));
                    }else if(typeof(op1 === "number") && typeof (op2 === "string")){
                        return String(op1).concat(String(op2));
                    }else if(typeof(op1 === "string") && typeof (op2 === "number")){
                        return String(op1).concat(String(op2));
                    }else {
                        console.log("Error de tipos de datos no permitidos realizando una concatenacion");
                        return null;
                    }
                //   -----------------------------------------------------------------------------------------------------
            }


        } else {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
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
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }
}
