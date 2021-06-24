import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../INTERFACES/Expresion";
import { Atributo } from "../EXPRESIONES/Atributo";

export class L_Atributo implements Expresion{
    linea: number;
    columna: number;
    puntos:Array<Expresion>;

    constructor(listaO:Array<Atributo>,li:number,col:number){

        this.puntos=listaO;
        this.linea=li;
        this.columna=col;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        return Tipo.CADENA;
    }
    getValorImplicito(ent: Entorno, arbol: AST) {

       
        return this.puntos;
    }

}