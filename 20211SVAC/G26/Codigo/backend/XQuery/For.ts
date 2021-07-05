import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { DeclaracionFor } from "./DeclaracionFor";

export class For implements InstruccionXQuery{
    linea: number;
    columna: number;
    listaFor: Array<DeclaracionFor>;
    constructor(listaFor: Array<DeclaracionFor>, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.listaFor = listaFor;

    }

    ejecutar(XQueryEnt: Entorno, xmlEnt: Entorno){
        //Un for puede ser: for $x in //book, at $i in //bok (Separados por coma)
        for(let i = 0; i < this.listaFor.length; i++){
            let forElem = this.listaFor[i];
            forElem.ejecutar(XQueryEnt, xmlEnt);
        }
    }
}