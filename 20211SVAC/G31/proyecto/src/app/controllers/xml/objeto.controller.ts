import { Atributo } from "./atributo.controller";
import { Entorno } from "./entorno.controller";

export class Objeto {
  identificador: string;
  valor: string;
  listaAtributos: Array<Atributo>;
  listaObjetos: Array<Objeto>;
  linea: number;
  columna: number;
  entorno: Entorno
  valorObj: string;

  constructor(id: string, valor: string, linea: number, columna: number, listaA: Array<Atributo>, listaO: Array<Objeto>, valorObj: string) {
    this.identificador = id;
    this.valor = valor;
    this.linea = linea;
    this.columna = columna;
    this.listaAtributos = listaA;
    this.listaObjetos = listaO;
    this.entorno = new Entorno(null);
    this.valorObj = valorObj;
  }
}
