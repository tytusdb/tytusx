import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";

export class Primitivo implements Expresion {
    linea: number;
    columna: number;
    valor: any;

    constructor(valor:any, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
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

    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
    
}