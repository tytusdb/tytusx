import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';
import { Entorno } from '../xml/entorno.controller';

export class MatchesAny extends Nodo {
  public instruccion: string;

  constructor(tipoOBJ: Tipo, tipo: Tipo, instruccion: string,
    linea: number, columna: number) {
    super(tipoOBJ, tipo, linea, columna);

    this.instruccion = instruccion;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in MatchesAny');
  }

  public c3d(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in MatchesAny');
  }

}
