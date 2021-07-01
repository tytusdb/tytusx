import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from 'src/app/Backend/XPATH/Analizador/Simbolos/Tipo';


export default class Identificador extends Instruccion {
  public identificador: string;
  constructor(identificador: string, fila: number, columna: number) {
    super(new Tipo(tipoDato.CADENA), fila, columna);
    this.identificador = identificador.toLowerCase();
  }
  public getNodosAST(): nodoAST {
    let nodo = new nodoAST(this.identificador);
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    return this.identificador;
  }
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }
}
