import { Arbol } from 'src/app/models/arbol.model';
import { Excepcion } from 'src/app/models/excepcion.model';
import { Nodo } from 'src/app/models/nodo.model';
import { NodoC3D } from 'src/app/models/nodoC3D.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class And extends Nodo {
  public opIzquierdo: Nodo;
  public opDerecho: Nodo;

  constructor(tipoOBJ: Tipo, tipo: Tipo, opIzquierdo: Nodo, opDerecho: Nodo,
    linea: number, columna: number) {
    super(tipoOBJ, tipo, linea, columna);

    this.tipo = Tipo.BOOLEAN;
    this.opIzquierdo = opIzquierdo;
    this.opDerecho = opDerecho;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    const resIzquierdo = this.opIzquierdo.ejecutar(tabla, arbol);
    if (resIzquierdo instanceof Excepcion)
      return resIzquierdo;

    const resDerecho = this.opDerecho.ejecutar(tabla, arbol);
    if (resDerecho instanceof Excepcion)
      return resDerecho;

    if (this.opIzquierdo.tipo == Tipo.BOOLEAN && this.opDerecho.tipo == Tipo.BOOLEAN) {
      return resIzquierdo && resDerecho;

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en la operación lógica 'and' se está tratando de operar ${this.opIzquierdo.tipo} y ${this.opDerecho.tipo}`,
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

    const resDerecho = this.opDerecho.c3d(tabla, arbol);
    if (resDerecho instanceof Excepcion)
      return resDerecho;

    let listaIzquierda: NodoC3D = <NodoC3D>resIzquierdo ;
    let listaDerecha: NodoC3D = <NodoC3D>resDerecho;

    if (this.opIzquierdo.tipo == Tipo.BOOLEAN && this.opDerecho.tipo == Tipo.BOOLEAN) {
      let opIZQ: boolean = (this.opIzquierdo.tipoOBJ == Tipo.CONSTANTE || this.opIzquierdo.tipoOBJ == Tipo.VARIABLE);
      let opDCH: boolean = (this.opDerecho.tipoOBJ == Tipo.CONSTANTE || this.opDerecho.tipoOBJ == Tipo.VARIABLE);
      
      if (opIZQ && opDCH) {
        let etqIZQV: string = arbol.crearEtiqueta();
        let etqIZQF: string = arbol.crearEtiqueta();
        let etqDCHOV: string = arbol.crearEtiqueta();
        let etqDCHOF: string = arbol.crearEtiqueta();

        lv = `${etqDCHOV}`;
        lf = `${etqIZQF}:\r\n${etqDCHOF}`;

        cadena += `${listaIzquierda.cadena}${etqIZQV}:\r\n`;
        cadena += `${listaDerecha.cadena}`;
      } else if (opIZQ && !opDCH) {
        let etqIZQV: string = arbol.crearEtiqueta();
        let etqIZQF: string = arbol.crearEtiqueta();

        lv = `${listaDerecha.lv}`;
        lf = `${etqIZQF}:\r\n${listaDerecha.lf}`;

        cadena += `${listaIzquierda.cadena}${etqIZQV}:\r\n`;
        cadena += `${listaDerecha.cadena}`;
      } else if (!opIZQ && opDCH) {
        let etqDCHOV: string = arbol.crearEtiqueta();
        let etqDCHOF: string = arbol.crearEtiqueta();

        lv = `${etqDCHOV}`;
        lf = `${listaDerecha.lf}:\r\n${etqDCHOF}`;

        cadena += `${listaIzquierda.cadena}${listaDerecha.lv}:\r\n`;
        cadena += `${listaDerecha.cadena}`;
      } else {
        lv = `${listaDerecha.lv}`;
        lf = `${listaIzquierda.lf}:\r\n${listaDerecha.lf}`;

        cadena += `${listaIzquierda.cadena}${listaIzquierda.lv}:\r\n`;
        cadena += `${listaDerecha.cadena}`;
      }

      resultado = new NodoC3D(cadena, lv, lf, "");
      return resultado;

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en la operación lógica 'and' se está tratando de operar ${this.opIzquierdo.tipo} y ${this.opDerecho.tipo}`,
        this.linea, this.columna);
      arbol.excepciones.push(excepcion);
      arbol.consola.push(excepcion.toString());
      return excepcion;

    }
  }
}
