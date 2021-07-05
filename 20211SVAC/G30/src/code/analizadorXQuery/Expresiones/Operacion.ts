import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";

export enum Operador {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    MAYOR_QUE,
    MENOR_QUE,
    DIFERENTE_QUE,
    IGUAL_QUE,
    OR,
    AND,
    NOT,
    MAYOR_IGUA_QUE,
    MENOR_IGUA_QUE,
    DESCONOCIDO
}

export class Operacion implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;
    public errores = [];

    constructor(op_izquierda: Expresion, op_derecha: Expresion, operacion: Operador, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }

    getTipo(ent: Entorno): Tipo {
        const valor = this.getValorImplicito(ent);
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOLEAN;
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


    getValorImplicito(ent: Entorno) {

        if (this.operador !== Operador.NOT) {

            let op1 = this.op_izquierda.getValorImplicito(ent);
            let op2 = this.op_derecha.getValorImplicito(ent);
            let type1 = typeof (op1)
            let type2 = typeof (op2)
            
            //suma
            if (this.operador == Operador.SUMA) {
                if (type1 == "number" && type2 == "number") {
                    return op1 + op2;
                }
                else if (type1 == "string" || type2 == "string") {
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
                    return String(op1) + String(op2);
                } else if (type1 == "object" && type2 == "number") {
                    return Number(op1[0]) + op2;
                }
                else if (type1 == "number" && type2 == "object") {
                    return Number(op2[0]) + op1;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //resta
            else if (this.operador == Operador.RESTA) {
                if (type1 == "number" && type2 == "number") {
                    return op1 - op2;
                }
                else if (type1 == "object" && type2 == "number") {
                    return Number(op1[0]) - op2;
                }
                else if (type1 == "number" && type2 == "object") {
                    return op1 - Number(op2[0]);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION) {
                if (type1 == "number" && type2 == "number") {
                    return op1 * op2;
                }
                else if (type1 == "object" && type2 == "number") {
                    return Number(op1[0]) * op2;
                }
                else if (type1 == "number" && type2 == "object") {
                    return op1 - Number(op2[0]);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //division
            else if (this.operador == Operador.DIVISION) {
                if (type1 == "number" && type2 == "number") {
                    if (op2 === 0) {
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        this.errores.push({
                            Tipo: 'Sintáctico',
                            Fila: this.linea,
                            Columna: this.columna,
                            Description: 'Valores incorrectos'
                        });
                        var err = this.GetErrorStorage();
                        this.errores = this.errores.concat(err);
                        this.SetStorage(this.errores);
                        return null;
                    }
                    return op1 / op2;
                }
                else if (type1 == "object" && type2 == "number") {
                    if (op2 === 0) {
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        this.errores.push({
                            Tipo: 'Sintáctico',
                            Fila: this.linea,
                            Columna: this.columna,
                            Description: 'Valores incorrectos'
                        });
                        var err = this.GetErrorStorage();
                        this.errores = this.errores.concat(err);
                        this.SetStorage(this.errores);
                        return null;
                    }
                    return Number(op1[0]) / op2;
                }
                else if (type1 == "number" && type2 == "object") {
                    if (Number(op2[0]) === 0) {
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        this.errores.push({
                            Tipo: 'Sintáctico',
                            Fila: this.linea,
                            Columna: this.columna,
                            Description: 'Valores incorrectos'
                        });
                        var err = this.GetErrorStorage();
                        this.errores = this.errores.concat(err);
                        this.SetStorage(this.errores);
                        return null;
                    }
                    return op1 / Number(op2[0]);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //modulo
            else if (this.operador == Operador.MODULO) {
                if (type1 == "number" && type2 == "number") {
                    if (op2 === 0) {
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        this.errores.push({
                            Tipo: 'Sintáctico',
                            Fila: this.linea,
                            Columna: this.columna,
                            Description: 'Valores incorrectos'
                        });
                        var err = this.GetErrorStorage();
                        this.errores = this.errores.concat(err);
                        this.SetStorage(this.errores);
                        return null;
                    }
                    return op1 % op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //menorque
            else if (this.operador == Operador.MENOR_QUE) {
                if (type1 === "number" && type2 === "number") {
                    if (op1 < op2) return true;
                    return false;
                }
                else if (type1 == "object" && type2 == "number") {
                    let flag = false;
                    for (let op of op1) {
                        if (Number(op) < op2) flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    let flag = false;
                    for (let op of op2) {
                        if (op1 < Number(op)) flag = true;
                    }
                    return flag;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una comparación");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //menoigualque
            else if (this.operador == Operador.MENOR_IGUA_QUE) {
                if (type1 == "number" && type2 == "number") {
                    if (op1 <= op2) return true;
                    return false;
                }
                else if (type1 == "object" && type2 == "number") {
                    let flag = false;
                    for (let op of op1) {
                        if (Number(op) <= op2) flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    let flag = false;
                    for (let op of op2) {
                        if (op1 <= Number(op)) flag = true;
                    }
                    return flag;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una comparación");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //mayorque
            else if (this.operador == Operador.MAYOR_QUE) {
                if (type1 == "number" && type2 == "number") {
                    if (op1 > op2) return true;
                    return false;
                }
                else if (type1 == "object") {
                    console.log('op1 es objeto')
                    let flag = false;
                    for (let op of op1) {
                        if (Number(op) > op2) flag = true;
                    }
                    console.log(flag)
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    console.log('op2 es objeto')
                    let flag = false;
                    for (let op of op2) {
                        if (op1 > Number(op)) flag = true;
                    }
                    return flag;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una comparación");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //mayorigualque
            else if (this.operador == Operador.MAYOR_IGUA_QUE) {
                if (type1 == "number" && type2 == "number") {
                    if (op1 >= op2) return true;
                    return false;
                }
                else if (type1 == "object" && type2 == "number") {
                    let flag = false;
                    for (let op of op1) {
                        if (Number(op) >= op2) flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    let flag = false;
                    for (let op of op2) {
                        if (op1 >= Number(op)) flag = true;
                    }
                    return flag;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una comparación");
                    this.errores.push({
                        Tipo: 'Sintáctico',
                        Fila: this.linea,
                        Columna: this.columna,
                        Description: 'Tipos de dato ' + type1 + ' y ' + type2 + ' incorrectos'
                    });
                    var err = this.GetErrorStorage();
                    this.errores = this.errores.concat(err);
                    this.SetStorage(this.errores);
                    return null;
                }
            }
            //IGUAL
            else if (this.operador == Operador.IGUAL_QUE) {
                if (op1 == op2) {
                    return true;
                }
                else if (type1 == "object" && type2 == "number") {
                    let flag = false;
                    for (let op of op1) {
                        if (Number(op) == op2) flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    let flag = false;
                    for (let op of op2) {
                        if (op1 == Number(op)) flag = true;
                    }
                    return flag;
                }

                return false;

            }
            //DIFERENTE
            else if (this.operador == Operador.DIFERENTE_QUE) {
                if (op1 != op2) {
                    return true;
                }
                else if (type1 == "object" && type2 === "number") {
                    let flag = false;
                    for (let op of op1) {
                        if (Number(op) != op2) flag = true;
                    }
                    return flag;
                }
                else if (type1 == "number" && type2 == "object") {
                    let flag = false;
                    for (let op of op2) {
                        if (op1 != Number(op)) flag = true;
                    }
                    return flag;
                }
                else {
                    return false;
                }
            }
            //AND
            else if (this.operador == Operador.AND) {
                if (op1 && op2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //OR
            else if (this.operador == Operador.OR) {
                if (op1 || op2) {
                    return true;
                }
                else {
                    return false;
                }
            }

        }
        return null;
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }
    //obtener contador
    GetErrorStorage(): any {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    }
    //actualizar contador
    SetStorage(error: any) {
        localStorage.setItem('errores_xquery', JSON.stringify(error));
    }
}