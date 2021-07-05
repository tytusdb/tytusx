import { AST } from "../Arboles/AST";
import { Entorno } from "../Arboles/Entorno";
import { Tipo } from "../Arboles/Tipo";
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

    public getValor():any {
        return this.valor;
    }

    public getLinea(): number {
        return this.linea;
    }

    public getColumna() {
        return this.columna;
    }

    getTipo(ent: Entorno, arbol: AST):Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        /*if (typeof(valor) === 'boolean')
        {
            return Tipo.BOOL;
        }*/
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
        return Tipo.STRUCT
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
    
}