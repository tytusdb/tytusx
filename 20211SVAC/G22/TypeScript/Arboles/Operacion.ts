import { AST } from "../Arboles/AST";
import { Entorno } from "../Arboles/Entorno";
import { Tipo } from "../Arboles/Tipo";
import { Expresion } from "../Interfaces/Expresion";

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

export class Operacion implements Expresion {
    public linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;

    constructor(op_izquierda:Expresion,op_derecha:Expresion, operacion:Operador, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
         if (typeof(valor) === 'string')
        {
            return Tipo.STRING;
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return Tipo.INT;
            }
           return Tipo.DOUBLE;
        }
            
        return Tipo.STRUCT;
    }
    

    getValorImplicito(ent: Entorno, arbol: AST) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT){
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
            
            //suma
            if (this.operador == Operador.SUMA)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 + op2;
                }
                else if (op1==="string" || op2 ==="string")
                {
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
                    return op1.ToString() + op2.ToString();
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //resta
            else if (this.operador == Operador.RESTA)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 - op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 * op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //division
            else if (this.operador == Operador.DIVISION)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    if(op2===0){
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        return null;
                    }
                    return op1 / op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //modulo
            else if (this.operador == Operador.MODULO)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    if(op2===0){
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        return null;
                    }
                    return op1 % op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }

        }else{
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.MENOS_UNARIO)
            {
                if (typeof(op1==="number"))
                {
                    return -1* op1;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una operación unaria");
                    return null;
                }
            }
        }
        return null;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
}