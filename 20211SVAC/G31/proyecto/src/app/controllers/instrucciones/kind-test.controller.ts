import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';
import { Entorno } from '../xml/entorno.controller';

export class KindTest extends Nodo {
  public instruccion: Nodo;

  constructor(tipo: Tipo, instruccion: Nodo,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.instruccion = instruccion;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in KindTest');
  }

}
