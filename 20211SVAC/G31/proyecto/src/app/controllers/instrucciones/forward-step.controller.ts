import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';
import { Entorno } from '../xml/entorno.controller';

export class ForwardStep extends Nodo {
  public instruccion: string;
  public NodeTest: Nodo;

  constructor(tipoOBJ: Tipo, tipo: Tipo, instruccion: string, NodeTest: Nodo,
    linea: number, columna: number) {
    super(tipoOBJ, tipo, linea, columna);

    this.instruccion = instruccion;
    this.NodeTest = NodeTest;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in ForwardStep');
  }

  public c3d(tabla: Tabla, arbol: Arbol) {
    throw new Error('Method not implemented in ForwardStep');
  }


}
