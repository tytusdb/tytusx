import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Arreglos extends Instruccion {
  public l_corchetes: Instruccion;
  public Objetos:Instruccion;
  constructor(objetos:Instruccion, fila: number, columna: number, instruccion: Instruccion) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.l_corchetes= instruccion
    this.Objetos=objetos;
  }
  public getNodosAST(): nodoAST {
    let nodo = new nodoAST('L_CORCHETES');
    /*
     *ESTE SE USARÁ PARA LOS CASOS
     * CORCHETEIZQ EXPRESION CORCHETEDER
     * L_CORCHETES CORCHETEIZQ EXPRESION CORCHETEDER
     */
    if(this.l_corchetes!=null){
        let lista= new nodoAST("L_CORCHETES")
        lista.agregarHijoAST(this.l_corchetes.getNodosAST());
        nodo.agregarHijoAST(lista);
    }
    if(this.Objetos!=null){
        let expresion= new nodoAST("EXPRESION")
        expresion.agregarHijoAST(this.Objetos.getNodosAST());
        nodo.agregarHijoAST(expresion);
    }
    return nodo;
  }

  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    //let variable = tabla.getVariable(this.identificador);
    /*if (variable != null) {
      this.tipoDato = variable.gettipo();
      return variable.getvalor();
    } else {
      return new Errores(
        'SEMANTICO',
        'VARIABLE ' + this.identificador + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }*/
  }
}
