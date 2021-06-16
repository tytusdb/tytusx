import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../INTERFACES/Expresion";

export class Dato implements Expresion {
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
            return Tipo.CADENA;
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return Tipo.ENTERO;
            }
           return Tipo.DECIMAL;
        }
            
        return Tipo.IDENTIFICADOR;
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
    
}