import {Atributo} from "./Atributo"

export class ObjetoNodo{
  identificador: string;
  texto: string;
  listaAtributos: Array<Atributo>;
  listaObjetos: Array<ObjetoNodo>;
  linea: number;
  columna: number;

  constructor(id: string, texto:string, listaAtributos: Array<Atributo>, listaObjetos: Array<ObjetoNodo>, linea:number, columna: number) {
    this.identificador = id;
    this.texto = texto;
    this.linea = linea;
    this.columna = columna;
    this.listaAtributos = listaAtributos;
    this, this.listaObjetos = listaObjetos;
  }
}