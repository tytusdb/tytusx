import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../INTERFACES/Expresion";


export class Atri implements Expresion{
    linea: number;
    columna: number;
    tk_id:string;
    la:Expresion;


    constructor(tk_id:string,la:Expresion,l:number,c:number){
        this.tk_id=tk_id;
        this.la=la;
        this.linea=l;
        this.columna=c;
    }


    getTipo(ent: Entorno, arbol: AST): Tipo {
        return Tipo.CADENA
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.tk_id;
    }

}