import { Entorno } from '../../Simbolo/Entorno';
import { Atributo } from './Atributo'

export class Objeto{
    identificador1:string;
    identificador2:string;
    texto : string;
    listaAtributos: Array<Atributo>;
    listaObjetos: Array<Objeto>;
    linea : number;
    columna : number;
    entorno : Entorno;

    constructor(id:string,texto:string,linea:number,columna:number,listaA:Array<Atributo>,listaO:Array<Objeto>,ide:string){
        this.identificador1=id;
        this.texto=texto;
        this.linea=linea;
        this.columna=columna;
        this.listaAtributos=listaA;
        this.listaObjetos = listaO;
        this.identificador2=ide;
        this.entorno=new Entorno(null);
    }
}