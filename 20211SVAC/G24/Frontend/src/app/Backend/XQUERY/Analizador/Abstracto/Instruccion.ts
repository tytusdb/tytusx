import Arbol from '../Simbolos/Arbol';
import tablaSimbolosxml from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import tablaSimbolos from '../Simbolos/tablaSimbolos'
import nodoAST from './nodoAST';
import Tipo from '../Simbolos/Tipo';
export abstract class  Instruccion
{
  public tipoDato: Tipo;
  public fila: number;
  public columna: number;
  constructor(tipo: Tipo, fila: number, columna: number) {
    this.tipoDato = tipo;
    this.fila = fila;
    this.columna = columna;
  }
  abstract interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml:tablaSimbolosxml): any;
  abstract getNodoAST(): nodoAST;
  abstract codigo3D(arbol: Arbol, tabla:tablaSimbolos):any;
}