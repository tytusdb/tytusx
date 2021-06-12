import { Atributo } from "./Atributo";
import { Entorno } from "../AST/Entorno";

export class Objeto{
    identificador1:string;
    identificador2:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<Objeto>;
    linea: number;
    columna: number;
    agregar: number;
    entorno: any;

    constructor(id1:string, id2:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaObjetos:Array<Objeto>, agregar:number){
        this.identificador1 = id1;
        this.identificador2 = id2;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaObjetos;
        this.agregar = agregar;
        this.entorno = null;
    }

    concatenarTexto(texto:string){
        this.texto = this.texto + " " + texto;
    }
}