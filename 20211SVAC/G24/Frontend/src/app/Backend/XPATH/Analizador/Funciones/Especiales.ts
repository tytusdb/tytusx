
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Identificador from '../Expresiones/Identificador';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Axes extends Instruccion {
 
  public Funcion: string;
  public Expresion: Instruccion
  constructor(funcion: string, fila: number, columna: number) {

    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.Funcion = funcion
  }
  public getNodosAST(): nodoAST {
    var nodo= new nodoAST('FUNCION ESPECIAL'); //PADRE SELECT
    var nodsBarras= new nodoAST(this.Funcion)
    nodo.agregarHijoAST(nodsBarras)
    
    return nodo;
  }
  interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }
  
}
