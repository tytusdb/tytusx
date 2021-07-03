import { Tipo } from './Tipo.js';
import { Operacion } from './Operaciones.js';
import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
export class If implements Instruccion{

  condicion:any;
  sentencias:any;
  sino:any;
  fila:number;
  columna:number;
  t:string;
  constructor(condicion:any,sentencias:any,sino:any,fila:number,columna:number, t:string){
    this.condicion=condicion;
    this.sentencias=sentencias;
    this.sino=sino;
    this.fila=fila;
    this.columna=columna;
    this.t=t;
  }

  ejecutar(entorno: Entorno, node:any) {
    let retorno=this.condicion.ejecutar(entorno,node);
    if(retorno!=null && retorno!=false){

      if(this.sentencias instanceof Operacion){
        let resultado=this.sentencias.ejecutar(entorno,this.sentencias);
        if(resultado!=null){
          if(this.sentencias.operador1.tipo==Tipo.VARIABLE){
            entorno.setVariable(this.sentencias.operador1.valor,resultado);
          }
          return resultado;
        }
      }
      return this.sentencias.ejecutar(entorno,this.sentencias);
    }else if(this.sino!=null){

      if(this.sino instanceof Operacion){
        let resultado=this.sino.ejecutar(entorno,this.sino);
        if(resultado!=null){
          if(this.sino.operador1.tipo==Tipo.VARIABLE){
            entorno.setVariable(this.sino.operador1.valor,resultado);
          }
          return resultado;
        }
      }
      return this.sino.ejecutar(entorno,this.sino);
    }
  }

}
