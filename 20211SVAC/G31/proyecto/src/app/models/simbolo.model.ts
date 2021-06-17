import { Tipo } from './tipo.model';

export class Simbolo {
  public tipoOBJ: Tipo;
  public tipo: Tipo;
  public identificador: string;
  public valor: Object;

  public ambito: string;
  public linea: number;
  public columna: number;

  constructor(tipoOBJ: Tipo, tipo: Tipo, identificador: string,
    valor: Object, ambito: string, linea: number, columna: number) {
    this.tipoOBJ = tipoOBJ;
    this.tipo = tipo;
    this.identificador = identificador;
    this.valor = valor;
    this.ambito = ambito;
    this.linea = linea;
    this.columna = columna;
  }
}
