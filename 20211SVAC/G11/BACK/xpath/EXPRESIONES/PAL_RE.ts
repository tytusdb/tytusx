import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../INTERFACES/Expresion";


export class PAL_RE implements Expresion{
    linea: number;
    columna: number;
    pr:string;
    op:Expresion;

    constructor(pr:string,op:Expresion,l:number,c:number){
        this.pr=pr;
        this.op=op;
        this.linea=l;
        this.columna=c;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        return Tipo.CADENA;
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.pr;
    }

}