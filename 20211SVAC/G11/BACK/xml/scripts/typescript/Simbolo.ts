import { AST } from "./AST";
import { Entorno } from "./Entorno";
import { Tipo } from "./Tipo";
import { Expresion } from "./Expresion"

export class Simbolo implements Expresion {
    public indentificador: string;
    public valor: any;
    public tipo: Tipo;
    linea: number;
    columna: number;

    constructor(tipo:Tipo, id:string, linea:number, columna:number, valor:any){
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        return this.tipo;
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }
    
}