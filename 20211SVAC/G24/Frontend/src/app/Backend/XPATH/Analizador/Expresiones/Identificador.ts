import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Identificador extends Instruccion {
  public identificador: string;
  constructor(identificador: string, fila: number, columna: number) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador.toLowerCase();
  }
  public getNodosAST(): nodoAST {
    let nodo = new nodoAST(this.identificador);
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let variable = tabla.getVariable(this.identificador);
    if (variable != null) {
      this.tipoDato = variable.gettipo();
      return variable.getvalor();
    } else {
      return new NodoErrores(
        'SEMANTICO',
        'VARIABLE ' + this.identificador + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }
  }
}
