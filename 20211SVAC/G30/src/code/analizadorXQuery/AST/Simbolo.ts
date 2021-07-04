import { Expresion } from "../Interfaces/Expresion";
import { Entorno } from "./Entorno";
import { Tipo } from "./Tipo"


export class Simbolo implements Expresion {
    public identificador: string;
    public valor: any;
    public tipo: Tipo;
    linea: number;
    columna: number;
 
    constructor(id:string, tipo:Tipo,  linea:number, columna:number, valor:any){
        this.identificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }

    getTipo(ent: Entorno): Tipo {
        return this.tipo;
    }
    getValorImplicito(ent: Entorno) {
        return this.valor;
    }
    
}