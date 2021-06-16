import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Predicados extends Instruccion {
  public l_corchetes: Instruccion;
  public Objetos:Instruccion;
  constructor(instruccion: Instruccion,objetos:Instruccion, fila: number, columna: number) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.l_corchetes= instruccion
    this.Objetos=objetos;
  }
  public getNodo(): nodoAST {
    let nodo = new nodoAST('L_CORCHETES');
    if(this.l_corchetes!=null){
        let lista= new nodoAST("L_CORCHETES")
        lista.agregarHijoAST(this.l_corchetes.getNodo());
        nodo.agregarHijoAST(lista);
    }
    if(this.Objetos!=null){
        let expresion= new nodoAST("EXPRESION")
        expresion.agregarHijoAST(this.Objetos.getNodo());
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
