import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Primitivo extends Nodo {
  public valor: Object | undefined;

  constructor(tipo: Tipo, valor: Object | undefined,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.valor = valor;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    return this.valor;
  }
}
