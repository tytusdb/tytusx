import { Entorno } from "../AST/Entorno";
import { Atributo } from "./Atributo";

export class Objeto{
    identificador:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<Objeto>;
    linea: number;
    columna: number;
    entorno: Entorno;
    completa: number;
    cierre: string;

    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<Objeto>,
                completa:number, cierre:string){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.entorno = new Entorno(null);
        this.completa = completa;
        this.cierre =  cierre;
    }
}