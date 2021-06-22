import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';
import { Entorno } from '../xml/entorno.controller';

export class PostFixExpr extends Nodo {
  public primaryExpr: Nodo;
  public predicateList: Array<Nodo>;

  constructor(tipo: Tipo, primaryExpr: Nodo, predicateList: Array<Nodo>,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.primaryExpr = primaryExpr;
    this.predicateList = predicateList;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in PostFixExpr');
  }


}
