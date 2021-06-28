import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { DeclaracionFor } from "./DeclaracionFor";

export class For implements Instruccion{
    linea: number;
    columna: number;
    listaFor: Array<DeclaracionFor>;
    constructor(listaFor: Array<DeclaracionFor>, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.listaFor = listaFor;

    }

    ejecutar(ent: Entorno){
        
    }
}