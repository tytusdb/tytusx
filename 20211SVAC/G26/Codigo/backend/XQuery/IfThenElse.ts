import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaz/expresion";
import { Instruccion } from "../Interfaz/instruccion";
import { Nodo } from "../XPath/Nodo";
import { CondicionIf } from "./CondicionIf";


export class IfThenElse implements Instruccion{
    linea: number;
    columna: number
    identificador: string;
    expresion: Expresion;
    condicionThen: CondicionIf | null;
    condicionElse: CondicionIf | null;
    constructor(identificador: string, expresion: Expresion, condicionThen: CondicionIf | null, condicionElse: CondicionIf | null, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador
        this.expresion = expresion;
        this.condicionElse = condicionElse;
        this.condicionThen = condicionThen
    }

    ejecutar(ent: Entorno){
        
    }
}