export class Excepcion {
  private tipo: string;
  private noFila: number;
  private noColumna: number;
  private descripcion: string;

  constructor(tipo: string, noFila: number, noColumna: number, descripcion: string) { 
      this.tipo = tipo;
      this.noFila = noFila;
      this.noColumna = noColumna;
      this.descripcion = descripcion;
  }
  
  public get sTipo() : string {
      return this.tipo;
  }

  public get sFila() : string {
      return this.noFila.toString();
  }

  public get sColumna() : string {
      return this.noColumna.toString();
  }
  
  public get sDescripcion() : string {
      return this.descripcion;
  }

  public toString = (): string => {
    return `\nError ${this.tipo} en la linea ${this.noFila} y columna ${this.noColumna}: ${this.descripcion}\n`;
  }
};