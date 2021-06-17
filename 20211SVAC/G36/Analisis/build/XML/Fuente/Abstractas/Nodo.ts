import { Entorno } from "./Entorno";

export abstract class Nodo{
    private fila:Number;
    private columna:Number;

    constructor(fila:Number, columna:Number){
        this.fila = fila;
        this.columna = columna;
    }

    abstract ejecutar(entorno:Entorno, errores:any):any;
    
    getFila(){
        return this.fila;
    }
    getColumna(){
        return this.columna;
    }
}