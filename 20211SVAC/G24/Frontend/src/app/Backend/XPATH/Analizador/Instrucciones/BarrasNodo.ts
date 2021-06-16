
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Identificador from '../Expresiones/Identificador';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class BarrasNodo extends Instruccion {
  public Barra: string;
  public Barra2:string;
  public Operacion: Instruccion
  constructor(barra1: string,expresion:Instruccion, fila: number, columna: number,barra2?:string) {

    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.Barra = barra1
    this.Barra2=barra2
    this.Operacion= expresion
  }
  public getNodosAST(): nodoAST {
    var nodo= new nodoAST('INSTRUCCION'); //PADRE SELECT
    var nodsBarras= new nodoAST(this.Barra)
    nodo.agregarHijoAST(nodsBarras)
    if(this.Barra2!=null){
      /*nodo.agregarHijo(this.Barra2)*/
      var nodsBarras2= new nodoAST(this.Barra2)
      nodo.agregarHijoAST(nodsBarras2)
    }
    if(this.Operacion!=null){
        
          nodo.agregarHijoAST(this.Operacion.getNodosAST())
    }
    
    return nodo;
  }

  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    arbol.gettablaGlobal();

    let variable = tabla.getVariable(this.Barra);
    if (variable != null) {
        /*SI NO ES NULA*/
    } else {
      return new NodoErrores(
        'SEMANTICO',
        'VARIABLE ' + this.Operacion + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }
  }
}
