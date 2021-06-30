import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import NodoErrores from "../Errores/NodoErrores";
import { reporteOp } from "../Reportes/reporteOp";

export default class Arbol {
  private instrucciones: Array<Instruccion[]>;
  private NodoErrores: Array<NodoErrores>;
  private funciones: Array<Instruccion>;
  public listaSimbolos: Array<reporteOp>;
  public getSimbolos(): Array<reporteOp> {
    return this.listaSimbolos;
  }
  public setReporte(instruccion:reporteOp){
    this.listaSimbolos.push(instruccion)
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
    this.listaSimbolos = new Array<reporteOp>();
  }
}
