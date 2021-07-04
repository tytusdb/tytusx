import { Expresion } from "../Interfaces/Expresion";
import { AST } from "./AST";
import { Entorno } from "./Entorno";
import { Tipos } from "./Tipos";

export class Simbolo implements Expresion {
    public iden: string;
    private valor: any;
    private tipo: Tipos;
    linea: number;
    columna: number;

    constructor(tipo:Tipos, id:string, linea:number, columna:number){
        this.iden = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }

    obtenerTipo(ent: Entorno, arbol: AST): Tipos {
        return this.tipo;
    }
    obtenerValor(ent: Entorno, arbol: AST) {
        return this.valor;
    }
    
}