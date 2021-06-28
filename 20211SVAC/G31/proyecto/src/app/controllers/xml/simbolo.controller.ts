import { Nodo } from "src/app/models/xmlNodo.model";
import { Tipo } from "src/app/models/tipo.model";
import { Entorno } from "./entorno.controller";
import { ArbolXML } from "src/app/models/xmlArbol.model";

export class Simbolo implements Nodo{
  public id: string;
  public linea: number;
  public columna: number;
  public valor: any;
  public tipo: Tipo;
  public entorno: Entorno | undefined;
  public ambito: string;
  public valorObj: string;

  constructor(id:string, linea: number, columna:number, tipo: Tipo, valor: any, ambito:string, valorObj: string){
    this.id = id;
    this.linea = linea;
    this.columna = columna;
    this.tipo = tipo;
    this.valor = valor;
    this.entorno = undefined
    this.ambito = ambito;
    this.valorObj = valorObj;
  }

  getTipo(entorno:Entorno, arbol: ArbolXML): Tipo{
    return this.tipo;
  }

  getValor(entorno:Entorno, arbol: ArbolXML): any{
    return this.valor;
  }

  getEtiqueta(): string{
    if(this.tipo == Tipo.ATRIBUTO){
      return `${this.id} = "${this.valor} "`
    }else{
      return ''
    }
  }

}
