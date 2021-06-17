
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Identificador from '../Expresiones/Identificador';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Axes extends Instruccion {
 
  public Axes: string;
  public Expresion: Instruccion
  constructor(barra1: string,expresion:Instruccion, fila: number, columna: number) {

    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.Axes = barra1
    this.Expresion= expresion
  }
  public getNodosAST(): nodoAST {
    var nodo= new nodoAST('AXES'); //PADRE SELECT
    var nodsBarras= new nodoAST(this.Axes)
    nodo.agregarHijoAST(nodsBarras)
    if(this.Expresion!=null){
        
          nodo.agregarHijoAST(this.Expresion.getNodosAST())
    }
    
    return nodo;
  }
  interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }
  
}
