import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Nodo } from "../XPath/Nodo";
import { Html } from "./Html";
import { IfThenElse } from "./IfThenElse";

export class Return implements Instruccion{
    linea: number;
    columna: number;
    identificador: string | undefined;
    listaNodos: Array<Nodo> | undefined;
    html: Html | undefined;
    ifthen: IfThenElse | undefined;
    constructor(identificador: string | undefined, listaNodos: Array<Nodo> | undefined, html: Html | undefined, ifthen: IfThenElse | undefined, linea: number, columna: number){
        this.html = html;
        this.listaNodos = listaNodos;
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.ifthen = ifthen;
    }

    ejecutar(ent:Entorno){

    }
}

export enum TipoReturn{
    NORMAL,
    HTML,
    IFTHENELSE
}