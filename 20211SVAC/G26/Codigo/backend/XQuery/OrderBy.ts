import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Sort } from "./Sort";


export class OrderBy implements Instruccion{
    
    linea: number;
    columna: number;
    listaSort: Array<Sort>;
    constructor(listaSort: Array<Sort>, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.listaSort = listaSort;
    }

    ejecutar(ent: Entorno){
        
    }
}