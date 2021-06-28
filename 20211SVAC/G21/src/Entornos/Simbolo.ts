import { Expresion } from "../Interfaces/Expresion";

export class Simbolo{
    id:string;
    tipo:string;
    valor: string;
    linea: number;
    columna: number;
    entorno: Simbolo[];

    constructor(id: string, tipo:string, valor: string, linea: number, columna: number, entorno:Array<Simbolo>){
        this.id = id
        this.tipo = tipo  
        this.valor = valor
        this.linea = linea
        this.columna = columna
        this.entorno = entorno
    }

    existe(id:string):boolean{
        for (let ent of this.entorno)
        {
            if(id == ent.id) return true
        }
        return false;
    }

    getSimbolo(id:string):any{
        let simboloTemp: Array<Simbolo> = [];
        for (let ent of this.entorno)
        {
            if(id == ent.id) 
            {
                simboloTemp.push(ent)
            } 
        }
        return simboloTemp;
    }
    
}
