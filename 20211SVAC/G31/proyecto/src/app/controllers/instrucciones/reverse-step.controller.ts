import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class ReverseStep extends Nodo {
  public instruccion: string;
  public NodeTest: Nodo | undefined;

  constructor(tipo: Tipo, instruccion: string, NodeTest: Nodo | undefined,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.instruccion = instruccion;
    this.NodeTest = NodeTest;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in ReverseStep');
  }
}
