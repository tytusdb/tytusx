import { Arbol } from 'src/app/models/arbol.model';
import { Excepcion } from 'src/app/models/excepcion.model';
import { Nodo } from 'src/app/models/nodo.model';
import { NodoC3D } from 'src/app/models/nodoC3D.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class MenorQue extends Nodo {
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

    if ((this.opIzquierdo.tipo == Tipo.DOUBLE || this.opIzquierdo.tipo == Tipo.INTEGER)
      && (this.opDerecho.tipo == Tipo.DOUBLE || this.opIzquierdo.tipo == Tipo.INTEGER)) {
      return parseFloat(resIzquierdo) <= parseFloat(resDerecho);

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en la operación relacional 'menor que' se está tratando de operar ${this.opIzquierdo.tipo} y ${this.opDerecho.tipo}`,
        this.linea, this.columna);
      arbol.excepciones.push(excepcion);
      arbol.consola.push(excepcion.toString());
      return excepcion;

    }
  }

  public c3d(tabla: Tabla, arbol: Arbol){
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

    if ((this.opIzquierdo.tipo == Tipo.DOUBLE || this.opIzquierdo.tipo == Tipo.INTEGER)
      && (this.opDerecho.tipo == Tipo.DOUBLE || this.opIzquierdo.tipo == Tipo.INTEGER)) {
      
      lv = arbol.crearEtiqueta();
      lf = arbol.crearEtiqueta();

      cadena = `${listaIzquierda.cadena}${listaDerecha.cadena}`;
      cadena += `if (${listaIzquierda.valor} <= ${listaDerecha.valor}) goto {lv}; \r\n goto {lf}; \r\n`;

      resultado = new NodoC3D(cadena, lv, lf, "");
      return resultado;

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en la operación relacional 'menor que' se está tratando de operar ${this.opIzquierdo.tipo} y ${this.opDerecho.tipo}`,
        this.linea, this.columna);
      arbol.excepciones.push(excepcion);
      arbol.consola.push(excepcion.toString());
      return excepcion;

    }
  }
}
