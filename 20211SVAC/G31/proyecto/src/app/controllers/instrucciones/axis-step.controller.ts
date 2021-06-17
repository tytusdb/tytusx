import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class AxisStep extends Nodo {
  public step: Nodo;
  public predicateList: Array<Nodo>;

  constructor(tipo: Tipo, step: Nodo, predicateList: Array<Nodo>,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.step = step;
    this.predicateList = predicateList;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in AxisStep');
  }
}
