import { Error } from "../arbol/error";
import { Errores } from "../arbol/errores";
import { Entorno } from "../interfaces/entorno";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../interfaces/instruccion";
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

export class Aritmeticas extends Instruccion {
    expIzq: Instruccion;
    expDer: Instruccion;
    operador: Operador;

    constructor(expIzq: Instruccion, expDer: Instruccion, operador: Operador, linea: string) {
        super(linea);
        Object.assign(this, { expIzq, expDer, operador });
    }

    ejecutar(e: Entorno) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT) {
            let exp1 = this.expIzq.ejecutar(e);
            let exp2 = this.expDer.ejecutar(e);
            //console.log(this.expDer)
            //suma
            if (this.operador == Operador.SUMA) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 + exp2;
                }
                else if (typeof (exp1 === "string") || typeof (exp2 === "string")) {
                    if (exp1 == null) exp1 = "null";
                    if (exp2 == null) exp2 = "null";
                    return exp1.ToString() + exp2.ToString();
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo sumar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //resta
            else if (this.operador == Operador.RESTA) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    //console.log(exp1, '-', exp2)
                    return exp1 - exp2;
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo restar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    //console.log(exp1, ' * ', exp2)
                    return exp1 * exp2;
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo multiplicar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //division
            else if (this.operador == Operador.DIVISION) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    if (exp2 === 0) {
                        Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se puede dividir ${exp1} con ${exp2}` }));
                        return null;
                    }
                    return exp1 / exp2;
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo dividir ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //modulo
            else if (this.operador == Operador.MODULO) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    if (exp2 === 0) {
                        Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo operar ${exp1} con ${exp2}` }));
                        return null;
                    }
                    return exp1 % exp2;
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo operar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //menorque
            else if (this.operador == Operador.MENOR_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 < exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null) exp1 = "null";
                    if (exp2 == null) exp2 = "null";
                    return exp1.ToString() < exp2.ToString();
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //mayorque
            else if (this.operador == Operador.MAYOR_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 > exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null) exp1 = "null";
                    if (exp2 == null) exp2 = "null";
                    return exp1.ToString() > exp2.ToString();
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //menorigual
            else if (this.operador == Operador.MENOR_IGUA_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 <= exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null) exp1 = "null";
                    if (exp2 == null) exp2 = "null";
                    return exp1.ToString() <= exp2.ToString();
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //mayorigual
            else if (this.operador == Operador.MAYOR_IGUA_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 >= exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null) exp1 = "null";
                    if (exp2 == null) exp2 = "null";
                    return exp1.ToString() >= exp2.ToString();
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //igual
            else if (this.operador == Operador.IGUAL_IGUAL) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 === exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null) exp1 = "null";
                    if (exp2 == null) exp2 = "null";
                    return exp1.ToString() === exp2.ToString();
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //diferente
            else if (this.operador == Operador.DIFERENTE_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return !(exp1 === exp2);
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null) exp1 = "null";
                    if (exp2 == null) exp2 = "null";
                    return !(exp1.ToString() === exp2.ToString());
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //and
            else if (this.operador == Operador.AND) {
                if (typeof (exp1 === "boolean") && typeof (exp2 === "boolean")) {
                    return (exp1 && exp2);
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo ejecutar lógica de ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //or
            else if (this.operador || Operador.AND) {
                if (typeof (exp1 === "boolean") && typeof (exp2 === "boolean")) {
                    return (exp1 || exp2);
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo ejecutar lógica de ${exp1} con ${exp2}` }));
                    return null;
                }
            }

        } else {
            let exp1 = this.expIzq.ejecutar(e);
            if (this.operador == Operador.MENOS_UNARIO) {
                if (typeof (exp1 === "number")) {
                    return -1 * exp1;
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo operar unariamente ${exp1}` }));
                    return null;
                }
            }
            else if (this.operador == Operador.NOT) {
                if (typeof (exp1 === "number")) {
                    return !exp1;
                }
                else {
                    Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo ejecutar lógica de ${exp1}` }));
                    return null;
                }
            }
        }
        return null;
        //Si no es error
        //Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se puede realizar una multiplicacion entre un operando tipo ${typeof exp1} y un operando tipo ${typeof exp2}` }));
    }
}