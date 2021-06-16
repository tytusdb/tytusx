import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../INTERFACES/Expresion";


export class Atributo implements Expresion{
    linea: number;
    columna: number;
    barras:string;
    puntos:string;

    constructor(bar:string,pu:string,li:number,col:number){
        this.barras=bar;
        this.puntos=pu;
        this.linea=li;
        this.columna=col;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        return Tipo.CADENA;
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.barras+this.puntos;
    }

}