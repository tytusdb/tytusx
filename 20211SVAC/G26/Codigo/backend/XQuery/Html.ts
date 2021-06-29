import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaz/instruccion";
import { Atributo } from "../XML/Atributo";
import { VarCall } from "./VarCall";

export class Html implements Instruccion{
    linea: number;
    columna: number;
    identifier: string;
    atributos: Array<Atributo>;
    listaHtml: Array<Html>;
    texto: string;
    isUnica: boolean;
    listaVarCall: Array<VarCall>;
    constructor(identifier: string, atributos: Array<Atributo>, texto: string, listaHtml: Array<Html>, listaVarCall: Array<VarCall>, isUnica: boolean, linea: number, columna: number){
        this.linea = linea;
        this.listaVarCall = listaVarCall;
        this.columna = columna;
        this.isUnica = isUnica;
        this.identifier = identifier;
        this.listaHtml = listaHtml;
        this.atributos = atributos;
        this.texto = texto;
    }

    ejecutar(ent: Entorno){

    }
}