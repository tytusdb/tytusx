export class Excepcion {
  public tipo: string;
  public descripcion: string;
  public linea: number;
  public columna: number;

  constructor(tipo: string, descripcion: string,
    linea: number, columna: number) {
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.linea = linea;
    this.columna = columna;
  }

  public toString = (): string => {
    return `\nError ${this.tipo} en la linea ${this.linea} y columna ${this.columna}: ${this.descripcion}\n`;
  }
}
