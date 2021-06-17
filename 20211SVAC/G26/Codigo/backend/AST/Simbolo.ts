import { Tipo } from "./Tipo";

export class Simbolo{
    tipo:Tipo;
    nombre:string;
    valor:any;
    linea:number;
    columna:number;

    constructor(tipo:Tipo, nombre:string, valor:any, linea:number, columna:number){
        this.tipo = tipo;
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo():Tipo{
        return this.tipo;
    }

    getNombre():string{
        return this.nombre;
    }

    getValor():any{
        return this.valor;
    }

    getLinea():number{
        return this.linea;
    }

    getColumna():number{
        return this.columna;
    }
}