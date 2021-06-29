import { Entorno } from "../AST/Entorno";
import { Primitiva } from "../Expresiones/Primitiva";
import { Expresion } from "../Interfaz/expresion";
import { Instruccion } from "../Interfaz/instruccion";


export class Where implements Instruccion{
    linea: number;
    columna: number;
    identificador: string;
    condicion: Expresion;
    fromRoot: boolean;
    constructor(identificador: string, condicion: Expresion, fromRoot: boolean, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.condicion = condicion;
        this.fromRoot = fromRoot;
    }

    public isFromRoot(): boolean{
        return this.fromRoot
    }

    ejecutar(ent: Entorno){

    }
}