
import {Tipo} from './Tipo';

export class Simbolo{

    id:string; 
    private valor: any; //Almacenara cualquier tipo y Entornos
    private tipo: Tipo;
    linea: number;
    columna: number;

    constructor(id:string, tipo:Tipo, linea:number, columna:number,valor: any){

        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }
}