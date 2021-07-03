import { Entorno } from "../Arboles/Entorno";
import { Atributo } from "../clasesXML/Atributo";

export class ObjetoNodo{
    identificador:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<ObjetoNodo>;
    linea: number;
    columna: number;
    entorno: Entorno;

    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<ObjetoNodo>){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.entorno = new Entorno(null);
    }
}