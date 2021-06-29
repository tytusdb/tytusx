import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Nodo } from "../XPath/Nodo";
import { Flwor } from "./FLWOR";


export class VarCall implements Instruccion{
    linea: number;
    columna: number;
    identifier: string | undefined;
    listaNodos: Array<Nodo> | undefined;
    flwor: Flwor | undefined;
    constructor(identifier:string, listaNodos: Array<Nodo>, flwor: Flwor | undefined, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identifier = identifier;
        this.listaNodos = listaNodos;
        this.flwor = flwor;
    }

    ejecutar(ent: Entorno){

    }
}