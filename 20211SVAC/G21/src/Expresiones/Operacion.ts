import { Tipo } from "../AST/Tipo";
import { Simbolo } from "../Entornos/Simbolo";
import { Expresion } from "../Interfaces/Expresion";


export class Operacion implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: string;

    constructor(op_izquierda:Expresion,op_derecha:Expresion, operacion:string, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }

    getTipo(ent: Simbolo): Tipo {
        const valor = this.getValorImplicito(ent);
        if (typeof(valor) === 'boolean')
        {
            return Tipo.BOOL;
        }
        else if (typeof(valor) === 'string')
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
        else if(valor === null){
            return Tipo.NULL;
        }
            
        return Tipo.VOID;
    }
    

    getValorImplicito(ent: Simbolo) {
        if (this.operador !== 'menos_unario' && this.operador !== 'not'){
            let op1 = this.op_izquierda.getValorImplicito(ent);
            let op2 = this.op_derecha.getValorImplicito(ent);
            
            //suma
            if (this.operador == 'suma')
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
            else if (this.operador == 'resta')
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 - op2;
                }
                else if (op1==="string" || op2 ==="string")
                {
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
                    return op1.ToString() - op2.ToString();
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }
            //multiplicación
            else if (this.operador == 'mult')
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
            else if (this.operador == 'div')
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
            else if (this.operador == 'mod')
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
            //or
            else if (this.operador == 'or')
            {
                if (typeof(op1==="boolean") && typeof(op2==="boolean"))
                {
                    if(op1 || op2)
                    {
                        return true;
                    }
                    return false;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una operacion logica");
                    return null;
                }
            }
            //and
            else if (this.operador == 'and')
            {
                if (typeof(op1==="boolean") && typeof(op2==="boolean"))
                {
                    if(op1 && op2)
                    {
                        return true;
                    }
                    return false;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una operacion logica");
                    return null;
                }
            }
           

        }else{
            let op1 = this.op_izquierda.getValorImplicito(ent);
            if (this.operador == 'menos_unario')
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