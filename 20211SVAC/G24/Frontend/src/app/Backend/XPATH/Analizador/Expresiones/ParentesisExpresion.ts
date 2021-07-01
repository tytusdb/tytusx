
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Identificador from '../Expresiones/Identificador';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class ParentesisExpresion extends Instruccion {
  
  public coma:string;
  public Expresion: Instruccion
  constructor(expresion:Instruccion, fila: number, columna: number,coma?:string) {

    super(new Tipo(tipoDato.ENTERO), fila, columna);
    
    this.coma=coma
    this.Expresion= expresion
  }
  public getNodosAST(): nodoAST {
    var nodo= new nodoAST('PARENTESIS_EXPRESION'); //PADRE SELECT
    
   
    if(this.Expresion!=null){
        
          nodo.agregarHijoAST(this.Expresion.getNodosAST())
    }
    if(this.coma!=null){
        var nodsBarras2= new nodoAST(this.coma)
        nodo.agregarHijoAST(nodsBarras2)
      }
    return nodo;
  }

  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    arbol.gettablaGlobal();

    let variable = tabla.getVariable(this.coma);
    if (variable != null) {
        /*SI NO ES NULA*/
    } else {
      return new NodoErrores(
        'SEMANTICO',
        'VARIABLE ' + this.Expresion + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }
  }
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }
}
