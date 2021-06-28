import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';
import { Primitivo } from '../expresiones/primitivo.controller';
import { Entorno } from '../xml/entorno.controller';

export class AxisStep extends Nodo {
  public step: Nodo;
  public predicateList: Array<Nodo>;

  constructor(tipoOBJ: Tipo, tipo: Tipo, step: Nodo, predicateList: Array<Nodo>,
    linea: number, columna: number) {
    super(tipoOBJ, tipo, linea, columna);

    this.step = step;
    this.predicateList = predicateList;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
      return this.step.ejecutar(tabla, arbol)
  }

  public c3d(tabla: Tabla, arbol: Arbol) {
    return this.step.c3d(tabla, arbol)
  }
}
