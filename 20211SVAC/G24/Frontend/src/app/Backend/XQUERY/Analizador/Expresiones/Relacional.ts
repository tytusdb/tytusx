import NodoErrores from "src/app/Backend/XML/Analizador/Excepciones/NodoErrores";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Relacional extends Instruccion {
  public cond1: Instruccion;
  public cond2: Instruccion;
  public relacion: Relacionales;
  constructor(
    relacion: Relacionales,
    fila: number,
    columna: number,
    cond1: Instruccion,
    cond2: Instruccion
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.relacion = relacion;
    this.cond1 = cond1;
    this.cond2 = cond2;
  }

  public getNodoAST(): nodoAST {
    let nodo = new nodoAST('RELACIONAL');
    nodo.agregarHijoAST(this.cond1.getNodoAST());
    nodo.agregarHijo(this.relacion + '', 'rel', this.relacion);
    nodo.agregarHijoAST(this.cond2.getNodoAST());
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
    let izq, der;
    izq = this.obtieneValor(this.cond1, arbol, tabla,tablaxml);
    if (izq instanceof NodoErrores) return izq;
    der = this.obtieneValor(this.cond2, arbol, tabla,tablaxml);
    if (der instanceof NodoErrores) return der;
    if (
      this.cond1.tipoDato.getTipo() == tipoDato.CADENA &&
      this.cond2.tipoDato.getTipo() != tipoDato.CADENA
    ) {
      let opera= this.TipoOperando()
      return {condicion1:izq, operador:opera, condicion2: der}
    } else if (
      this.cond2.tipoDato.getTipo() == tipoDato.CADENA &&
      this.cond1.tipoDato.getTipo() != tipoDato.CADENA
    ) {
      let opera= this.TipoOperando()
      return {condicion1:izq, operador:opera, condicion2: der}
    } else {
      this.tipoDato.setTipo(tipoDato.BOOLEANO);
      switch (this.relacion) {
        case Relacionales.IGUAL:
          return izq == der;
        case Relacionales.DIFERENTE:
          return izq != der;
        case Relacionales.MENORQUE:
          return izq < der;
        case Relacionales.MENORIGUAL:
          return izq <= der;
        case Relacionales.MAYORQUE:
          return izq > der;
        case Relacionales.MAYORIGUAL:
          return izq >= der;
        default:
          return 'what';
      }
    }
  }
  obtieneValor(operando: Instruccion, arbol: Arbol, tabla: tablaSimbolos, tablaxml:tablaSimbolosxml): any {
    let valor = operando.interpretar(arbol, tabla, tablaxml)
    switch (operando.tipoDato.getTipo()) {
      case tipoDato.ENTERO:
        return parseInt(valor);
      case tipoDato.DECIMAL:
        return parseFloat(valor);
      case tipoDato.CARACTER:
        var da = valor + '';
        var res = da.charCodeAt(0);
        return res;
      case tipoDato.BOOLEANO:
        let dats = valor + '';
        let otr = dats.toLowerCase();
        return parseInt(otr);
      case tipoDato.CADENA:
        return '' + valor;
    }
  }
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }
  TipoOperando(){
    switch (this.relacion) {
      case Relacionales.IGUAL:
        return "==";
      case Relacionales.DIFERENTE:
        return "!=";
      case Relacionales.MENORQUE:
        return "<";
      case Relacionales.MENORIGUAL:
        return "<=";
      case Relacionales.MAYORQUE:
        return ">";
      case Relacionales.MAYORIGUAL:
        return ">=";
      default:
        return 'what';
    }
  }
}

export enum Relacionales {
  IGUAL,
  DIFERENTE,
  MAYORQUE,
  MENORQUE,
  MAYORIGUAL,
  MENORIGUAL,
  NOIGUAL
}
