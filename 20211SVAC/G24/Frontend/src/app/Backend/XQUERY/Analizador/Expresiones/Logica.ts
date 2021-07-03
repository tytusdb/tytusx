//relacionales

import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import tablaSimbolosxml from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import tablaSimbolos from '../Simbolos/tablaSimbolos';

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

  public getNodoAST(): nodoAST {
    let nodo = new nodoAST('LOGICO');
    if (this.condExcep != null) {
      nodo.agregarHijo(this.loogica + '', 'log', this.loogica);
      nodo.agregarHijoAST(this.condExcep.getNodoAST());
    } else {
      nodo.agregarHijoAST(this.cond1?.getNodoAST());
      nodo.agregarHijo(this.loogica + '', 'log', this.loogica);
      nodo.agregarHijoAST(this.cond2?.getNodoAST());
    }
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
    let izq, der, unico;
    izq = der = unico = null;
    if (this.condExcep != null) {
      unico = this.condExcep.interpretar(arbol, tabla, tablaxml)
      if (unico instanceof NodoErrores) return unico;
    } else {
      izq = this.cond1?.interpretar(arbol, tabla, tablaxml)
      if (izq instanceof NodoErrores){
        return izq;
      } 
      der = this.cond2?.interpretar(arbol, tabla, tablaxml)
      if (der instanceof NodoErrores) {
        return der;
      }
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
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }
}

export enum Logicas {
  OR,
  AND,
  NOT,
}
