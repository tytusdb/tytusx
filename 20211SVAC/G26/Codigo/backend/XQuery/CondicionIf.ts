import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Nodo } from "../XPath/Nodo";
import { FuncionXQuery } from "./FuncionXQuery";
import { Html } from "./Html";

export class CondicionIf implements Instruccion{
    linea: number;
    columna: number;
    etiqueta: Html | undefined;
    identificador: string | undefined;
    listaNodos: Array<Nodo> | undefined;
    funcionXQ: FuncionXQuery | undefined;
    constructor(identificador: string | undefined, listaNodos: Array<Nodo> | undefined, etiqueta: Html | undefined, funcionXQ: FuncionXQuery | undefined, linea: number, columna: number){
        this.etiqueta = etiqueta;
        this.identificador = identificador;
        this.listaNodos = listaNodos;
        this.funcionXQ = funcionXQ;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: Entorno){

    }
}