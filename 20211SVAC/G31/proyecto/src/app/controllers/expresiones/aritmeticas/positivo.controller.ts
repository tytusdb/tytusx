import { Arbol } from 'src/app/models/arbol.model';
import { Excepcion } from 'src/app/models/excepcion.model';
import { Nodo } from 'src/app/models/nodo.model';
import { NodoC3D } from 'src/app/models/nodoC3D.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Positivo extends Nodo {
  public opIzquierdo: Nodo;

  constructor(tipoOBJ: Tipo, tipo: Tipo, opIzquierdo: Nodo,
    linea: number, columna: number) {
    super(tipoOBJ, tipo, linea, columna);

    this.opIzquierdo = opIzquierdo;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    const resIzquierdo = this.opIzquierdo.ejecutar(tabla, arbol);
    if (resIzquierdo instanceof Excepcion)
      return resIzquierdo;

    if (this.opIzquierdo.tipo == Tipo.INTEGER) {
      this.tipo = Tipo.INTEGER;
      return parseInt(resIzquierdo) * 1;

    } else if (this.opIzquierdo.tipo == Tipo.DOUBLE) {
      this.tipo = Tipo.DOUBLE;
      return parseFloat(resIzquierdo) * 1;

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en el operador unario '+' se está tratando de operar ${this.opIzquierdo.tipo}`,
        this.linea, this.columna);
      arbol.excepciones.push(excepcion);
      arbol.consola.push(excepcion.toString());
      return excepcion;

    }
  }

  public c3d(tabla: Tabla, arbol: Arbol) {
    let resultado: NodoC3D;
    let temporal: string = "";
    let cadena: string = "";

    const resIzquierdo = this.opIzquierdo.c3d(tabla, arbol);
    if (resIzquierdo instanceof Excepcion) 
      return resIzquierdo;

    let listaIzquierda: NodoC3D = <NodoC3D>resIzquierdo ;

    if (this.opIzquierdo.tipo == Tipo.INTEGER) {
      this.tipo = Tipo.INTEGER;
      temporal = arbol.crearTemporal();

      cadena = `${listaIzquierda.cadena}`;
      cadena += `${temporal} = ${listaIzquierda.valor} * 1;\r\n`

      resultado = new NodoC3D(cadena, "", "", temporal);
      return resultado;

    } else if (this.opIzquierdo.tipo == Tipo.DOUBLE) {
      this.tipo = Tipo.DOUBLE;
      temporal = arbol.crearTemporal();

      cadena = `${listaIzquierda.cadena}`;
      cadena += `${temporal} = ${listaIzquierda.valor} * 1;\r\n`

      resultado = new NodoC3D(cadena, "", "", temporal);
      return resultado;

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en el operador unario '+' se está tratando de operar ${this.opIzquierdo.tipo}`,
        this.linea, this.columna);
      arbol.excepciones.push(excepcion);
      arbol.consola.push(excepcion.toString());
      return excepcion;

    }

  }
}
