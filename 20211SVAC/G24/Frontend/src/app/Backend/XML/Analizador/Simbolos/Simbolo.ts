import Tipo from './Tipo';

export default class Simbolo {
  private tipo: Tipo;
  private identificador: String;
  private atributo = new Map<String, String>();
  private linea: String;
  private columna: String;
  private valor: any; //este es el valor que va a recibir

  constructor(tipo: Tipo, identificador: String, linea: String, columna: String, valor?: any) {
    this.tipo = tipo;
    this.identificador = identificador.toLowerCase();
    this.valor = valor;
    this.linea = linea;
    this.columna = columna;
  }
  //getters y setters
  public gettipo(): Tipo {
    return this.tipo;
  }
  public settipo(value: Tipo) {
    this.tipo = value;
  }
  public getidentificador(): String {
    return this.identificador;
  }
  public setidentificador(value: String) {
    this.identificador = value;
  }
  public getvalor(): any {
    return this.valor;
  }
  public setvalor(value: any) {
    this.valor = value;
  }

  public agregarAtributo(par1: String, par2: String) {
    this.atributo.set(par1, par2);
  }

  public getAtributo(): Map<String, String> {
    return this.atributo;
  }

  public setAtributo(atributo: Map<String, String>) {
    this.atributo = atributo;
  }

  public getLinea(): String {
    return this.linea;
  }
  public getColumna(): String {
    return this.columna;
  }
  public setLinea(linea: String) {
    this.linea = linea;
  }
  public setColumna(col: String) {
    this.columna = col;
  }

}
