import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../INTERFACES/Expresion";

export class PR implements Expresion{
    linea: number;
    columna: number;
    valor:string;

    constructor(val:string,li:number,col:number){
        this.valor=val;
        this.linea=li;
        this.columna=col;
    }


    getTipo(ent: Entorno, arbol: AST): Tipo {
       return Tipo.CADENA;
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }

}