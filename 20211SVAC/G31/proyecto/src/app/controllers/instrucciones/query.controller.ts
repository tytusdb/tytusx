import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Query extends Nodo {
  public simbolo: string;
  public pathExpr: Nodo | undefined;

  constructor(tipo: Tipo, simbolo: string, pathExpr: Nodo | undefined,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.simbolo = simbolo;
    this.pathExpr = pathExpr;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in Query');
  }
}
