import { Atributo } from "./Atributo";
import { Entorno } from "./Entorno"

export class Elemento{
    identificador:string;
    identificador2:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaElementos: Array<Elemento>;
    linea: number;
    columna: number;
    entorno: Entorno;

    constructor(id:string, texto:string, linea:number, columna:number, listaA:Array<Atributo>, listaO:Array<Elemento>, id2:string){
        this.identificador = id;
        this.identificador2 = id2;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaA;
        this.listaElementos = listaO;
        this.entorno = new Entorno(null);
    }
}