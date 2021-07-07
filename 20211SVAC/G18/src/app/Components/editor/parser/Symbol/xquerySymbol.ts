export class XQuerySymbol {
  public tipo: TypeXQuery;
  public nombre: string;
  public valor: string;
  public fila: number;
  public columna: number;
  public ambito: string;
  public posicion: number;

  constructor(tipo, nombre, valor, fila, columna, ambito) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.valor = valor;
    this.ambito = ambito;
    this.fila = fila;
    this.columna = columna;
    this.posicion = -1;
  }

  getNombre() {
    return this.nombre;
  }

  getTipo() {
    switch (this.tipo) {
      case 0:
        return 'ID';
      case 1:
        return 'NUMBER';
      case 2:
        return 'STRING';
      case 3:
        return 'BOOLEAN';
    }
    return this.tipo;
  }

  getValor() {
    return this.valor;
  }

  getAmbito() {
    return this.ambito;
  }

  getFila() {
    return this.fila;
  }

  getColumna() {
    return this.columna;
  }

  getPosicion() {
    return this.posicion;
  }

  setPosicion(n) {
    this.posicion = n;
  }
}

export enum TypeXQuery {
  ID = 0,
  NUMBER = 1,
  STRING = 2,
  BOOLEAN = 3,
}
