import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { Consulta } from "../XPath/Consulta";
import { Nodo } from "../XPath/Nodo";


export class Sort{
    linea: number;
    columna: number;
    public identifier: string;
    public listaNodos: Array<Nodo>;
    constructor(identifier: string, listaNodos: Array<Nodo>, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.identifier = identifier;
        this.listaNodos = listaNodos;
    }

}