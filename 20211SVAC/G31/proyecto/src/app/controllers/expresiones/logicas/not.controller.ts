import { Arbol } from 'src/app/models/arbol.model';
import { Excepcion } from 'src/app/models/excepcion.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Not extends Nodo {
  public opIzquierdo: Nodo;

  constructor(tipo: Tipo, opIzquierdo: Nodo,
    linea: number, columna: number) {
    super(tipo, linea, columna);

    this.opIzquierdo = opIzquierdo;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    const resIzquierdo = this.opIzquierdo.ejecutar(tabla, arbol);
    if (resIzquierdo instanceof Excepcion)
      return resIzquierdo;

    if (this.opIzquierdo.tipo == Tipo.BOOLEAN) {
      this.tipo = Tipo.BOOLEAN;
      return !resIzquierdo;

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en la operación lógica '!' se está tratando de operar ${this.opIzquierdo.tipo}`,
        this.linea, this.columna);
      arbol.excepciones.push(excepcion);
      arbol.consola.push(excepcion.toString());
      return excepcion;

    }
  }
}
