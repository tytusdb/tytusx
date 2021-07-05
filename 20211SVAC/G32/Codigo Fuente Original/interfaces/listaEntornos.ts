import { Entorno } from "./entorno";
import * as _ from 'lodash';

export class ListaEntornos {
  private static instance: ListaEntornos;
  lista: Entorno[];

  private constructor() {
    this.lista = [];
  }

  public static getInstance(): ListaEntornos {
    if (!ListaEntornos.instance) {
      ListaEntornos.instance = new ListaEntornos();
    }
    return ListaEntornos.instance;
  }

  public push(entorno: Entorno): void {
    this.lista.push(_.cloneDeep(entorno));
  }

  public clear(): void {
    this.lista = [];
  }
}