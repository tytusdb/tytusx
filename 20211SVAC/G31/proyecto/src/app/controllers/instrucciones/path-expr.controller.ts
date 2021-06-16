import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class PathExpr extends Nodo {
  public simbolo: string;
  public pathExprIZQ: Nodo | undefined;
  public pathExprDCH: Nodo | undefined;

  constructor(tipo: Tipo, simbolo: string,
    pathExprIZQ: Nodo | undefined, pathExprDCH: Nodo | undefined,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.simbolo = simbolo;
    this.pathExprIZQ = pathExprIZQ;
    this.pathExprDCH = pathExprDCH;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in PathExpr');
  }
}
