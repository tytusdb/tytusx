import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';
import { Entorno } from '../xml/entorno.controller';

export class Query extends Nodo {
  public simbolo: string;
  public pathExpr: Nodo | undefined;

  constructor(tipoOBJ: Tipo, tipo: Tipo, simbolo: string, pathExpr: Nodo | undefined,
    linea: number, columna: number) {
    super(tipoOBJ, tipo, linea, columna);

    this.simbolo = simbolo;
    this.pathExpr = pathExpr;
  }

  public ejecutar(tabla: Tabla | Entorno, arbol: Arbol) {
    return this.pathExpr?.ejecutar(tabla, arbol)
  }

  public c3d(tabla: Tabla | Entorno, arbol: Arbol) {
    return this.pathExpr?.c3d(tabla, arbol)
  }
}
