import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Nodo } from "../XPath/Nodo";


export class Sort implements Instruccion{
    linea: number;
    columna: number;
    identifier: string;
    listaNodos: Array<Nodo>;
    constructor(identifier: string, listaNodos: Array<Nodo>, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identifier = identifier;
        this.listaNodos = listaNodos;
    }

    ejecutar(ent: Entorno){

    }
}