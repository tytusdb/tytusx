
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Errores from '../Excepciones/Errores';
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
  public getNodo(): nodoAST {
    var nodo= new nodoAST('INSTRUCCION'); //PADRE SELECT
    nodo.agregarHijo(this.Barra2);
    if(this.Barra2!=null){
      nodo.agregarHijo(this.Barra2)
    }
    if(this.Operacion!=null){
      var expresion= new nodoAST("EXPRESION")
      expresion.agregarHijoAST(this.Operacion.getNodo())
      nodo.agregarHijoAST(expresion)
    }
    return nodo;
  }

  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    arbol.gettablaGlobal();

    let variable = tabla.getVariable(this.Barra);
    if (variable != null) {
        /*SI NO ES NULA*/
    } else {
      return new Errores(
        'SEMANTICO',
        'VARIABLE ' + this.Operacion + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }
  }
}
