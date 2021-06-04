import { Atributo } from "./Atributo";

export class Objeto{
    identificador:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<Objeto>;
    linea: number;
    columna: number;

    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<Objeto>){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO
    }
}