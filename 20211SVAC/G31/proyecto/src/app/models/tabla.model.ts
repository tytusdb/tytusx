import { Simbolo } from './simbolo.model';

export class Tabla {
  public ambito: string;
  public anterior: Tabla | undefined;
  public variables: Map<String, Simbolo>;

  constructor(ambito: string, anterior: Tabla | undefined) {
    this.ambito = ambito;
    this.anterior = anterior;
    this.variables = new Map<String, Simbolo>();
  }

  public setVariable(simbolo: Simbolo): string | undefined {
    for (let entorno: Tabla | undefined = this; entorno != undefined; entorno = entorno.anterior) {

      for (let identificador of Array.from(entorno.variables.keys())) {
        if (identificador.toLowerCase() === simbolo.identificador.toLowerCase()) {
          return `La variable ${identificador} ya ha sido declarada.`;
        }
      }

    }

    this.variables.set(simbolo.identificador, simbolo);
    return undefined;
  }

  public getVariable(identificador: string): Simbolo | undefined {
    for (let entorno: Tabla | undefined = this; entorno != undefined; entorno = entorno.anterior) {

      for (let key of Array.from(entorno.variables.keys())) {
        if (key.toLowerCase() === identificador.toLowerCase()) {
          return entorno.variables.get(identificador);
        }
      }

    }
    return undefined;
  }
}
