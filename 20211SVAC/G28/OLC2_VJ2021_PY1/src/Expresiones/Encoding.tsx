import {Objeto} from "./Objeto";

export class Encoding{
    identificador: string;
    version: string;
    encoding: string;
    linea: number;
    columna: number;
    listaObjetos: Array<Objeto>;

    constructor(id:string, version:string, encoding:string, linea:number, columna:number, listaObjetos:Array<Objeto>){
        this.identificador = id;
        this.version = version;
        this.encoding = encoding;
        this.linea = linea;
        this.columna = columna;
        this.listaObjetos = listaObjetos;
    }
}