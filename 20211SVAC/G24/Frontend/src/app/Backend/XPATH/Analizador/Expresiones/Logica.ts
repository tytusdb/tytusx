//relacionales

import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Errores from '../Excepciones/Errores';
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

  public getNodo(): nodoAST {
    let nodo = new nodoAST('LOGICO');
    if (this.condExcep != null) {
      nodo.agregarHijo(this.loogica + '', 'log', this.loogica);
      nodo.agregarHijoAST(this.condExcep.getNodo());
    } else {
      nodo.agregarHijoAST(this.cond1?.getNodo());
      nodo.agregarHijo(this.loogica + '', 'log', this.loogica);
      nodo.agregarHijoAST(this.cond2?.getNodo());
    }
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let izq, der, unico;
    izq = der = unico = null;
    if (this.condExcep != null) {
      unico = this.condExcep.interpretar(arbol, tabla);
      if (unico instanceof Errores) return unico;
    } else {
      izq = this.cond1?.interpretar(arbol, tabla);
      if (izq instanceof Errores) return izq;
      der = this.cond2?.interpretar(arbol, tabla);
      if (der instanceof Errores) return der;
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
