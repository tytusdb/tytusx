import { Expresion } from "../Operaciones/InterfazExpresion";

export class Predicate {

    expresion: Expresion; 
    linea: number;
    columna: number;

    constructor(expresion: Expresion, linea:number, columna:number) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
}