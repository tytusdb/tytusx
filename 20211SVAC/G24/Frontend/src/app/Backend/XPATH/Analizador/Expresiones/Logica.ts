//relacionales

import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Logica extends Instruccion {
  private cond1: Instruccion | undefined;
  private cond2: Instruccion | undefined;
  private condExcep: Instruccion | undefined;
  private loogica: Logicas;
  constructor(
    relacion: Logicas,
    fila: number,
    columna: number,
    cond1: Instruccion,
    cond2?: Instruccion
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.loogica = relacion;
    if (!cond2) this.condExcep = cond1;
    else {
      this.cond1 = cond1;
      this.cond2 = cond2;
    }
  }

  public getNodosAST(): nodoAST {
    let nodo = new nodoAST('LOGICO');
    if (this.condExcep != null) {
      nodo.agregarHijo(this.loogica + '', 'log', this.loogica);
      nodo.agregarHijoAST(this.condExcep.getNodosAST());
    } else {
      nodo.agregarHijoAST(this.cond1?.getNodosAST());
      nodo.agregarHijo(this.loogica + '', 'log', this.loogica);
      nodo.agregarHijoAST(this.cond2?.getNodosAST());
    }
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let izq, der, unico;
    izq = der = unico = null;
    if (this.condExcep != null) {
      unico = this.condExcep.interpretar(arbol, tabla);
      if (unico instanceof NodoErrores) return unico;
    } else {
      izq = this.cond1?.interpretar(arbol, tabla);
      if (izq instanceof NodoErrores) return izq;
      der = this.cond2?.interpretar(arbol, tabla);
      if (der instanceof NodoErrores) return der;
    }
    //inicio comparacion
    switch (this.loogica) {
      case Logicas.AND:
        this.tipoDato.setTipo(tipoDato.BOOLEANO);
        return izq && der ? true : false;
      case Logicas.OR:
        this.tipoDato.setTipo(tipoDato.BOOLEANO);
        return izq || der ? true : false;
      case Logicas.NOT:
        this.tipoDato.setTipo(tipoDato.BOOLEANO);

        return !unico;
    }
  }
}

export enum Logicas {
  OR,
  AND,
  NOT,
}
