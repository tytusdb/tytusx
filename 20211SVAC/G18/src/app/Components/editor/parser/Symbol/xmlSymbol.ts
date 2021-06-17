export class XMLSymbol {
  public tipo: TypeXml;
  public nombre: string;
  public valor: string;
  public fila: number;
  public columna: number;
  public ambito: string;

  constructor(tipo, nombre, valor, fila, columna, ambito) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.valor = valor;
    this.ambito = ambito;
    this.fila = fila;
    this.columna = columna;
  }

  getNombre() {
    return this.nombre;
  }

  getTipo() {
    switch (this.tipo) {
      case 0:
        return 'Atributo';
      case 1:
        return 'Valor';
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
}

export enum TypeXml {
  atributo = 0,
  valor = 1,
}
