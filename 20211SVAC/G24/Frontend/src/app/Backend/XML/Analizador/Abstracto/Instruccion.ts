import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo from '../Simbolos/Tipo';
import nodoAST from './nodoAST';
export abstract class Instruccion {
  public tipoDato: Tipo;
  public fila: number;
  public columna: number;
  constructor(tipo: Tipo, fila: number, columna: number) {
    this.tipoDato = tipo;
    this.fila = fila;
    this.columna = columna;
  }
  abstract interpretar(arbol: Arbol, tabla: tablaSimbolos): any;
  abstract getNodo(): nodoAST;
}
