import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";

export abstract class Expresion{

    public fila:number;
    public columna:number;

    constructor(fila:number, columna:number){
        this.fila = fila;
        this.columna = columna;
    }
    public abstract evaluar():Simbolo;

}