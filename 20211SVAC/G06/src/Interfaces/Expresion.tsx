import { Entorno } from '../xmlAST/Entorno';
import { Simbolo } from '../xmlAST/Simbolo';
import { tipoPrimitivo } from '../xpathAST/Expresiones/Primitivo';

export type Retorno ={
    value : any,
    type : tipoPrimitivo,
    SP:Number
}

export interface  Expression {

    line: Number;
    column: Number;

    execute(environment: Entorno, simboloPadre?:Simbolo) : Retorno;
    GraficarAST(texto:string):string;
    
}

