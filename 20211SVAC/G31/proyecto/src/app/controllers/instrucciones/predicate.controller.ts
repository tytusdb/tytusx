import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';
import { Entorno } from '../xml/entorno.controller';

export class Predicate extends Nodo {
  public expr: Nodo;

  constructor(tipo: Tipo, expr: Nodo,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.expr = expr;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in Predicate');
  }



}
