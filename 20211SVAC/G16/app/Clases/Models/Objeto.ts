import Atributo from "./Atributo";
import  Raiz from "./Raiz";

export default class Objeto{

  nombreInit:string;
  nombreFin:string;
  unica:boolean;
  texto:string;
  atributos:any;
  elementos:any;
  linea:number;
  columna:number;

  public constructor(nombreInit:string,nombreFin:string,texto:string, atributos:any,elementos:any,unica:boolean,linea:number,columna:number){
    this.nombreInit=nombreInit;
    this.nombreFin=nombreFin;
    this.texto=texto;
    this.unica=unica;
    this.atributos=atributos;
    this.elementos=elementos;
    this.linea=linea;
    this.columna=columna;

  }
}
