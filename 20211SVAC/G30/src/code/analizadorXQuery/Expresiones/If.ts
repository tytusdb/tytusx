import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Expresion } from "../Interfaces/Expresion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')
 
export class If implements Expresion {
    linea: number;
    columna: number;
    public condition: any;
    public if_then: any;
    public if_else: any;

    constructor(linea: number, columna: number, condition: any, if_then: any, if_else: any) {
        this.linea = linea;
        this.columna = columna;
        this.condition = condition;
        this.if_then = if_then;
        this.if_else = if_else;
    }

    getTipo(ent: Entorno){
        return 'IF';
    }

    getValorImplicito(ent: Entorno):any {

        if(this.condition.getValorImplicito(ent)){
            return this.if_then.getValorImplicito(ent);
        }
        else{
            return this.if_else.getValorImplicito(ent);
            
        }

    }

}