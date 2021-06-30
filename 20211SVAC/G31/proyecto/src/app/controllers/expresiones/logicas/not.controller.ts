import { Arbol } from 'src/app/models/arbol.model';
import { Excepcion } from 'src/app/models/excepcion.model';
import { Nodo } from 'src/app/models/nodo.model';
import { NodoC3D } from 'src/app/models/nodoC3D.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Not extends Nodo {
  public opIzquierdo: Nodo;

  constructor(tipoOBJ: Tipo, tipo: Tipo, opIzquierdo: Nodo,
    linea: number, columna: number) {
    super(tipoOBJ ,tipo, linea, columna);

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

  public c3d(tabla: Tabla, arbol: Arbol) {
    let resultado: NodoC3D;
    let cadena: string = "";
    let lv: string = "";;
    let lf:string = "";

    const resIzquierdo = this.opIzquierdo.c3d(tabla, arbol);
    if (resIzquierdo instanceof Excepcion) 
      return resIzquierdo;

    let listaIzquierda: NodoC3D = <NodoC3D>resIzquierdo ;

    if (this.opIzquierdo.tipo == Tipo.BOOLEAN) {
      this.tipo = Tipo.BOOLEAN;
      let opIZQ: boolean = (this.opIzquierdo.tipoOBJ == Tipo.CONSTANTE || this.opIzquierdo.tipoOBJ == Tipo.VARIABLE);

      if (opIZQ) {
        let etqIZQV: string = arbol.crearEtiqueta();
        let etqIZQF: string = arbol.crearEtiqueta();
       
        lv = `${etqIZQF}`;
        lf = `${etqIZQV}`;
      } else {
        lv = `${listaIzquierda.lf}`;
        lf = `${listaIzquierda.lv}`;
      }

      cadena += listaIzquierda.cadena;
      resultado = new NodoC3D(cadena, lv, lf, "");
      return resultado;

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
