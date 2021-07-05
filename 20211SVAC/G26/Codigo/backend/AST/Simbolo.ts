import { Tipo } from "./Tipo";

export class Simbolo{
    tipo:Tipo;
    nombre:string;
    valor:any;
    linea:number;
    columna:number;
    posicion:number;

    constructor(tipo:Tipo, nombre:string, valor:any, linea:number, columna:number){
        this.tipo = tipo;
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.posicion = 0;
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

    getPosicion():number{
        return this.posicion;
    }

    setPosicion(posicion:number):void{
        this.posicion = posicion;
    }
}
