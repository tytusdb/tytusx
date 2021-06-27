import { Entorno } from '../xmlAST/Entorno';
import { Retorno } from './Expresion';
//import {EntornoXQuery} from '../xqueryAST/AmbientesXquery/EntornoXQuery' 

export interface ExpressionXquery {

    line: Number;
    column: Number;
    //executeXquery(entAct : EntornoXQuery, RaizXML: Entorno) : Retorno
}