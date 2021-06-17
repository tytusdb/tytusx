import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../INTERFACES/Expresion";


export class Identificador implements Expresion{
    linea: number;
    columna: number;
    identificador:string;
    exp:Expresion;

    constructor(id:string,ex:Expresion,li:number,col:number){
        this.identificador=id;
        this.exp=ex;
        this.linea=li;
        this.columna=col;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {            
        return Tipo.IDENTIFICADOR
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        return Tipo.IDENTIFICADOR
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
}