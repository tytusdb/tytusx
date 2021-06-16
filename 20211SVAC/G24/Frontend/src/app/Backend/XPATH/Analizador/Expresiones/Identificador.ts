import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Identificador extends Instruccion {
  public identificador: string;
  public Objetos:Instruccion;
  constructor(identificador: string,objetos:Instruccion, fila: number, columna: number) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador.toLowerCase();
    this.Objetos=objetos;
  }
  public getNodo(): nodoAST {
    let nodo = new nodoAST('IDENTIFICADOR');
    nodo.agregarHijo(this.identificador);
    if(this.Objetos!=null){
      let nodito= new nodoAST("INSTRUCCION")
      nodito.agregarHijoAST(this.Objetos.getNodo())
      nodo.agregarHijoAST(nodito);
    }
    return nodo;
  }

  /*
  public getNodo():nodoAST{
    let nodo= new nodoAST("");
    return nodo;
  }
  */
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let variable = tabla.getVariable(this.identificador);
    if (variable != null) {
      this.tipoDato = variable.gettipo();
      return variable.getvalor();
    } else {
      return new Errores(
        'SEMANTICO',
        'VARIABLE ' + this.identificador + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }
  }
}
