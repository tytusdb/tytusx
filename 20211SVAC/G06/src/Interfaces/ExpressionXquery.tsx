import {EntornoXQuery} from '../xqueryAST/AmbientesXquery/EntornoXQuery';
import { Entorno } from '../xmlAST/Entorno'; 
import { Simbolo } from '../xmlAST/Simbolo';
import { tipoPrimitivo } from '../xqueryAST/ExpresionesXpath/Primitivo';

export type Retorno ={
    value : any,
    type : tipoPrimitivo
}

export interface ExpressionXquery {

    line: Number;
    column: Number;
    executeXquery(entXquery: EntornoXQuery, ent: Entorno, simboloPadre?:Simbolo) : Retorno
    GraficarAST(texto:string):string;
}