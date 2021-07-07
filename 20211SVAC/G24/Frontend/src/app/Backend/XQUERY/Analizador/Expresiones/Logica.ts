//relacionales

import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import tablaSimbolosxml from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Variable from './Variable';
import Relacional from './Relacional';
import { Parser } from 'GramaticaXML';

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
      if(this.cond1 instanceof Relacional){
        var tipo1
        var tipo2
        tipo1=this.cond1.cond1.tipoDato.getTipo();
        tipo2=this.cond1.cond2.tipoDato.getTipo();
        if(tipo1==tipoDato.CADENA){
          if(tipo2==tipoDato.ENTERO){
            var tempcondicion1 =parseInt(izq.condicion1)
            izq= this.hacerOperacionRel(tempcondicion1,izq.operador,izq.condicion2)
          }
        }
        if(tipo1==tipoDato.ENTERO){
          if(tipo2==tipoDato.CADENA){
            var tempcondicion2= parseInt(izq.condicion2)   
            izq= this.hacerOperacionRel(izq.condicion1,izq.operador,tempcondicion2 )        
          }
        }
      }
      if (izq instanceof NodoErrores){
        return izq;
      } else if (this.cond1 instanceof Variable) {
        var buscar1 = tabla.getVariable(izq);
        if (buscar1 != null) {
          izq = buscar1.getvalor()
        }
       
      }
      var cambiandotipo
      try {
        cambiandotipo = parseInt(izq)
        this.cond1.tipoDato.setTipo(tipoDato.ENTERO)
      } catch (error) {
        try {
          cambiandotipo = parseFloat(izq)
          this.cond1.tipoDato.setTipo(tipoDato.DECIMAL)
        } catch (error) {
          this.cond1.tipoDato.setTipo(tipoDato.CADENA)
        }
      }
      der = this.cond2?.interpretar(arbol, tabla, tablaxml)
      if(this.cond2 instanceof Relacional){
        var tipo1
        var tipo2
        tipo1=this.cond2.cond1.tipoDato.getTipo();
        tipo2=this.cond2.cond2.tipoDato.getTipo();
        if(tipo1==tipoDato.CADENA){
          if(tipo2==tipoDato.ENTERO){
            var tempcond1= parseInt(der.condicion1)
            der= this.hacerOperacionRel(tempcond1,der.operador,der.condicion2 )
          }
        }
        if(tipo1==tipoDato.ENTERO){
          if(tipo2==tipoDato.CADENA){
            var tempcond2= parseInt(der.condicion2)
            der= this.hacerOperacionRel(der.condicion1,der.operador,tempcond2 )           
          }
        }
      }
      if (der instanceof NodoErrores) {
        return der;
      }else if (this.cond2 instanceof Variable) {
        var buscar2 = tabla.getVariable(izq);
        if (buscar2 != null) {
          der = buscar2.getvalor()
        }
       
      }
      var cambiandotipo2
      try {
        cambiandotipo2 = parseInt(der)
        this.cond2.tipoDato.setTipo(tipoDato.ENTERO)
      } catch (error) {
        try {
          cambiandotipo2 = parseFloat(der)
          this.cond2.tipoDato.setTipo(tipoDato.DECIMAL)
        } catch (error) {
          this.cond2.tipoDato.setTipo(tipoDato.CADENA)
        }
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
  hacerOperacionRel(cond1: any, Operador: String, cond2: any): Boolean {
    switch (Operador) {
      case "==":
        return cond1 == cond2;
      case "!=":
        return cond1 != cond2;
      case "<":
        return cond1 < cond2;
      case "<=":
        return cond1 <= cond2;
      case ">":
        return cond1 > cond2;
      case ">=":
        return cond1 >= cond2;
      default:
        return false;
    }
  }
}

export enum Logicas {
  OR,
  AND,
  NOT,
}
