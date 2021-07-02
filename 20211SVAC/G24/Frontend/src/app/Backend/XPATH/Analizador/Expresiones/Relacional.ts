//aritmeticas

import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Relacional extends Instruccion {
  private cond1: Instruccion;
  private cond2: Instruccion;
  private relacion: Relacionales;
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

  public getNodosAST(): nodoAST {
    let nodo = new nodoAST('RELACIONAL');
    nodo.agregarHijoAST(this.cond1.getNodosAST());
    nodo.agregarHijo(this.relacion + '', 'rel', this.relacion);
    nodo.agregarHijoAST(this.cond2.getNodosAST());
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let izq, der;
    izq = this.obtieneValor(this.cond1, arbol, tabla);
    if (izq instanceof NodoErrores) return izq;
    der = this.obtieneValor(this.cond2, arbol, tabla);
    if (der instanceof NodoErrores) return der;
    if (
      this.cond1.tipoDato.getTipo() == tipoDato.CADENA &&
      this.cond2.tipoDato.getTipo() != tipoDato.CADENA
    ) {
      return new NodoErrores(
        'ERROR SEMANTICO',
        'NO SE PUEDE COMPARAR UNA CADENA CON OTRO TIPO DE DATO QUE NO SEA CADENA',
        this.fila,
        this.columna
      );
    } else if (
      this.cond2.tipoDato.getTipo() == tipoDato.CADENA &&
      this.cond1.tipoDato.getTipo() != tipoDato.CADENA
    ) {
      return new NodoErrores(
        'ERROR SEMANTICO',
        'NO SE PUEDE COMPARAR UNA CADENA CON OTRO TIPO DE DATO QUE NO SEA CADENA',
        this.fila,
        this.columna
      );
    } else {
      this.tipoDato.setTipo(tipoDato.BOOLEANO);
      switch (this.relacion) {
        case Relacionales.IGUAL:
          return izq == der;
        case Relacionales.DIFERENTE:
          return izq != der;
        case Relacionales.MENOR:
          return izq < der;
        case Relacionales.MENORIGUAL:
          return izq <= der;
        case Relacionales.MAYOR:
          return izq > der;
        case Relacionales.MAYORIGUAL:
          return izq >= der;
        default:
          return 'what';
      }
    }
  }
  obtieneValor(operando: Instruccion, arbol: Arbol, tabla: tablaSimbolos): any {
    let valor = operando.interpretar(arbol, tabla);
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
}

export enum Relacionales {
  IGUAL,
  DIFERENTE,
  MAYOR,
  MENOR,
  MAYORIGUAL,
  MENORIGUAL,
  NOIGUAL
}
