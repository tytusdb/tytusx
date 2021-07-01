import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import { Instruccion } from '../Abstracto/Instruccion';
import NodoErrores from '../Excepciones/NodoErrores';
import { reporteTabla } from '../Reportes/reporteTabla';
import Atributo from 'src/app/Backend/XML/Analizador/Expresiones/Atributo';
export default class Arbol {
  private instrucciones: Array<Instruccion[]>;
  private NodoErrores: Array<NodoErrores>;
  private funciones: Array<Instruccion>;
  public listaSimbolos: Array<reporteTabla>;

  public getSimbolos(): Array<reporteTabla> {
    return this.listaSimbolos;
  }
  public actualizarTabla(
    identificador: string,
    valor: string,
    linea: string,
    entorno: string,
    columna: string
  ): boolean {
    for (var elemento of this.listaSimbolos) {
      if (
        elemento.getIdentificador().toString() == identificador.toLowerCase() &&
        elemento.getEntorno().toString() == entorno.toString()
      ) {
        elemento.setValor(valor);
        elemento.setLinea(linea);
        elemento.setColumna(columna);
        return true;
      }
    }
    return false;
  }
  public BuscarTipo(identificador: string): string {
    for (var elemento of this.listaSimbolos) {
      if (elemento.getIdentificador() == identificador.toLowerCase()) {
        return elemento.getForma().toString();
      }
    }
    return 'as';
  }

  

 
  public getfunciones(): Array<Instruccion> {
    return this.funciones;
  }
  public setfunciones(value: Array<Instruccion>) {
    this.funciones = value;
  }
  public getNodoErrores(): Array<NodoErrores> {
    return this.NodoErrores;
  }
  public setNodoErrores(value: Array<NodoErrores>) {
    this.NodoErrores = value;
  }

  public getinstrucciones(): Array<Instruccion[]> {
    return this.instrucciones;
  }
  public setinstrucciones(value: Array<Instruccion[]>) {
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

  constructor(instrucciones: Array<Instruccion[]>) {
    this.instrucciones = instrucciones;
    this.consola = '';
    this.tablaGlobal = new tablaSimbolos();
    this.NodoErrores = new Array<NodoErrores>();
    this.funciones = new Array<Instruccion>();
    this.listaSimbolos = new Array<reporteTabla>();
  }
}
