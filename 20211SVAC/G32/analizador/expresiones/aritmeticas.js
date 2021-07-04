"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmeticas = exports.Operador = void 0;
const error_1 = require("../arbol/error");
const errores_1 = require("../arbol/errores");
const instruccion_1 = require("../interfaces/instruccion");
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
class Aritmeticas extends instruccion_1.Instruccion {
    constructor(expIzq, expDer, operador, linea) {
        super(linea);
        Object.assign(this, { expIzq, expDer, operador });
    }
    ejecutar(e) {
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
                    if (exp1 == null)
                        exp1 = "null";
                    if (exp2 == null)
                        exp2 = "null";
                    return exp1.ToString() + exp2.ToString();
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo sumar ${exp1} con ${exp2}` }));
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
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo restar ${exp1} con ${exp2}` }));
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
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo multiplicar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //division
            else if (this.operador == Operador.DIVISION) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    if (exp2 === 0) {
                        errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se puede dividir ${exp1} con ${exp2}` }));
                        return null;
                    }
                    return exp1 / exp2;
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo dividir ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //modulo
            else if (this.operador == Operador.MODULO) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    if (exp2 === 0) {
                        errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo operar ${exp1} con ${exp2}` }));
                        return null;
                    }
                    return exp1 % exp2;
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo operar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //menorque
            else if (this.operador == Operador.MENOR_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 < exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null)
                        exp1 = "null";
                    if (exp2 == null)
                        exp2 = "null";
                    return exp1.ToString() < exp2.ToString();
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //mayorque
            else if (this.operador == Operador.MAYOR_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 > exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null)
                        exp1 = "null";
                    if (exp2 == null)
                        exp2 = "null";
                    return exp1.ToString() > exp2.ToString();
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //menorigual
            else if (this.operador == Operador.MENOR_IGUA_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 <= exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null)
                        exp1 = "null";
                    if (exp2 == null)
                        exp2 = "null";
                    return exp1.ToString() <= exp2.ToString();
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //mayorigual
            else if (this.operador == Operador.MAYOR_IGUA_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 >= exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null)
                        exp1 = "null";
                    if (exp2 == null)
                        exp2 = "null";
                    return exp1.ToString() >= exp2.ToString();
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //igual
            else if (this.operador == Operador.IGUAL_IGUAL) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return exp1 === exp2;
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null)
                        exp1 = "null";
                    if (exp2 == null)
                        exp2 = "null";
                    return exp1.ToString() === exp2.ToString();
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //diferente
            else if (this.operador == Operador.DIFERENTE_QUE) {
                if (typeof (exp1 === "number") && typeof (exp2 === "number")) {
                    return !(exp1 === exp2);
                }
                else if (exp1 === "string" || exp2 === "string") {
                    if (exp1 == null)
                        exp1 = "null";
                    if (exp2 == null)
                        exp2 = "null";
                    return !(exp1.ToString() === exp2.ToString());
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo comparar ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //and
            else if (this.operador == Operador.AND) {
                if (typeof (exp1 === "boolean") && typeof (exp2 === "boolean")) {
                    return (exp1 && exp2);
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo ejecutar lógica de ${exp1} con ${exp2}` }));
                    return null;
                }
            }
            //or
            else if (this.operador || Operador.AND) {
                if (typeof (exp1 === "boolean") && typeof (exp2 === "boolean")) {
                    return (exp1 || exp2);
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo ejecutar lógica de ${exp1} con ${exp2}` }));
                    return null;
                }
            }
        }
        else {
            let exp1 = this.expIzq.ejecutar(e);
            if (this.operador == Operador.MENOS_UNARIO) {
                if (typeof (exp1 === "number")) {
                    return -1 * exp1;
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo operar unariamente ${exp1}` }));
                    return null;
                }
            }
            else if (this.operador == Operador.NOT) {
                if (typeof (exp1 === "number")) {
                    return !exp1;
                }
                else {
                    errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se pudo ejecutar lógica de ${exp1}` }));
                    return null;
                }
            }
        }
        return null;
        //Si no es error
        //Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `No se puede realizar una multiplicacion entre un operando tipo ${typeof exp1} y un operando tipo ${typeof exp2}` }));
    }
}
exports.Aritmeticas = Aritmeticas;
