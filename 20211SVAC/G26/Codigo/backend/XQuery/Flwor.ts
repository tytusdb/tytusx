import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Return } from "./Return";

export class Flwor implements Instruccion{

    linea: number;
    columna: number;
    retType: Return;
    opcionales: Array<Instruccion>;
    constructor(opcionales: Array<Instruccion>, retType: Return, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.retType = retType;
        this.opcionales = opcionales;
    }

    ejecutar(ent: Entorno){

    }

}