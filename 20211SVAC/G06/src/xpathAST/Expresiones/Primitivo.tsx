import { Entorno } from '../../xmlAST/Entorno';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { Simbolo } from '../../xmlAST/Simbolo';


export enum tipoPrimitivo {
    NUMBER,
    STRING,
    BOOL,
    NODO,
    ATRI,
    RESP,
    error
}

export class Primitivo implements Expression{
    
    constructor (
    public line : Number, 
    public column : Number, 
    public valor : any, 
    public tipoPrimitivo : tipoPrimitivo) {}

    public execute(ent: Entorno, simboloPadre?:Simbolo) : Retorno {
        
        if (this.tipoPrimitivo === tipoPrimitivo.NUMBER) {
            return { value: Number(this.valor), type: tipoPrimitivo.NUMBER };
        }else if (this.tipoPrimitivo === tipoPrimitivo.STRING) {
            return { value: String(this.valor), type: tipoPrimitivo.STRING };
        }else {
            throw new Error("Error Semantico: no se reconoce el valor, Linea: "+this.line+"Column: "+this.column);
        }
    }

}