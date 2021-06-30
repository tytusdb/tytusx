import { TipoError } from "./Tipo_Error";

export class Error {
  linea: number;
  columna: number;
  tipo: TipoError;
  tipo_documento: string;
  lexema: string;

  constructor(linea: number, columna: number, tipo: TipoError, tipo_documento: string, lexema:string) {
    this.linea = linea;
    this.columna = columna;
    this.tipo = tipo;
    this.tipo_documento = tipo_documento;
    this.lexema = lexema;
  }

  public  getLinea(): number{
    return this.linea;
  }

  public getColumna(): number {
    return this.columna;
  }

  public getTipo() :TipoError{
    return this.tipo;
  }

  public getTipoDocumento():string {
    return this.tipo_documento;
  }

  public getLexema(): string{
    return this.lexema;
  }
}
