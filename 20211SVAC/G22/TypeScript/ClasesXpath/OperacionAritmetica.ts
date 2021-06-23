import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { Operador } from "./Operador";
import { TiposXpath } from "./TiposXpath";



export class OperacionAritmetica implements NodoRutaXpath {
    linea: number;
    columna: number;
    op_izquierda: NodoRutaXpath;
    op_derecha: NodoRutaXpath;
    operador: Operador;

    constructor(op_izquierda:NodoRutaXpath,op_derecha:NodoRutaXpath, operacion:Operador, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }

    getTipo( arbol: ArbolXpath): TiposXpath {
        //asignamos el tipo segun sea el typo de valor .
        const valor = this.getValorImplicito(arbol);
        if (typeof(valor) === 'boolean')
        {
            return TiposXpath.BOOL;
        }
        else if (typeof(valor) === 'string')
        {
            return TiposXpath.STRING;
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return TiposXpath.INT;
            }
           return TiposXpath.DOUBLE;
        }
        else if(valor === null){
            return TiposXpath.NULL;
        }
            
        return TiposXpath.VOID;
    }
    

    getValorImplicito( arbol: ArbolXpath) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT){
            let op1 = this.op_izquierda.getValorImplicito(arbol);
            let op2 = this.op_derecha.getValorImplicito(arbol);
            console.log(op1);
            console.log(op1);
            
            //suma
            if (this.operador == Operador.SUMA)
            {
                    //suma en caso ambos sean tipo number
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 + op2;
                }
                //si alguno es string entonces se concatena
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
                        console.log("Resultado indefinido, no puede ejecutarse operación de division sobre cero.");
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
                        console.log("Resultado indefinido, no puede ejecutarse operación de modulo sobre cero.");
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
            let op1 = this.op_izquierda.getValorImplicito(arbol);
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