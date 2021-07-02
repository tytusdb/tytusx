 
import { Expresion } from "../Interfaces/Expresion";
import { AST } from "./AST";
import { Entorno } from "./Entorno";
import { Tipo } from "./Tipo";

export class Simbolo implements Expresion {
    public indentificador: string;
    private valor: any;
    private tipo: Tipo;
    linea: number;
    columna: number;
    simbolo_cst: any;
    //instruccionSemantica: string;

    constructor(tipo:Tipo, id:string, linea:number, columna:number){
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        return this.tipo;
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }
    
}
