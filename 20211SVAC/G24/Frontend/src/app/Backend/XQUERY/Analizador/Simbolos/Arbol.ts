import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import { Instruccion } from '../Abstracto/Instruccion';
import NodoErrores from '../Excepciones/NodoErrores';
import { reporteTabla } from '../Reportes/reporteTabla';
import Atributo from 'src/app/Backend/XML/Analizador/Expresiones/Atributo';
export default class Arbol {
  private instrucciones: Array<Instruccion>;

  private NodoErrores: Array<NodoErrores>;

  public listaSimbolos: Array<reporteTabla>;
  private dot: string;
  private c: number;
  private encoding: String;
  /**CODIGO DE 3 DIRECCIONES */
  public codigo3d: Array<String>;
  public Encabezadocodigo3d: Array<String>;
  contadort: number;
  etiquetasL: number;
  contadorP: number;
  contadorS: number;

  public getEncoding(): String {
    return this.encoding;
  }

  public setEncoding(encoding: String) {
    this.encoding = encoding;
  }

  public getSimbolos(): Array<reporteTabla> {
    return this.listaSimbolos;
  }


  public BuscarTipo(identificador: String): String {
    for (var elemento of this.listaSimbolos) {
      if (elemento.getIdentificador() == identificador) {
        return elemento.getTipo().toString();
      }
    }

    return 'as';
  }




  public actualizarTabla(identificador: string, linea: string, columna: string): boolean {
    for (var elemento of this.listaSimbolos) {
      if (elemento.getIdentificador().toString() == identificador) {
        elemento.setContenido(linea);
        elemento.setLinea(linea);
        elemento.setColumna(linea);
        elemento.setEntorno(identificador);

        return true;
      }
    }
    return false;
  }


  public getNodoErrores(): Array<NodoErrores> {
    return this.NodoErrores;
  }
  public setNodoErrores(value: Array<NodoErrores>) {
    this.NodoErrores = value;
  }



  public getinstrucciones(): Array<Instruccion> {
    return this.instrucciones;
  }
  public setinstrucciones(value: Array<Instruccion>) {
    this.instrucciones = value;
  }
  private consola: String = '';
  public getconsola(): String {
    return this.consola;
  }
  public setconsola(value: String) {
    this.consola = value;
  }
  public actualizaConsola(uptodate: String) {
    this.consola = `${this.consola}${uptodate}\n`;
  }
  private tablaGlobal: tablaSimbolos;
  public gettablaGlobal(): tablaSimbolos {
    return this.tablaGlobal;
  }
  public settablaGlobal(value: tablaSimbolos) {
    this.tablaGlobal = value;
  }

  constructor(instrucciones: Array<Instruccion>) {
    this.instrucciones = instrucciones;
    this.consola = '';
    this.tablaGlobal = new tablaSimbolos();
    this.NodoErrores = new Array<NodoErrores>();
    this.listaSimbolos = new Array<reporteTabla>();
    this.dot = ""
    this.c = 0
  }
}
