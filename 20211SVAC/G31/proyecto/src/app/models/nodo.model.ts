import { Arbol } from "./arbol.model";
import { Tabla } from "./tabla.model";
import { Tipo } from "./tipo.model";

import { Entorno } from 'src/app/controllers/xml/entorno.controller'

export abstract class Nodo {
  public linea: number;
  public columna: number;
  public tipo: Tipo;

  constructor(tipo: Tipo, linea: number, columna: number) {
    this.tipo = tipo;
    this.linea = linea;
    this.columna = columna;
  }

  public abstract ejecutar(tabla: Tabla | Entorno, arbol: Arbol): any;

 // public abstract ejecutar2(tabla: Entorno, arbol: Arbol): any;
}
