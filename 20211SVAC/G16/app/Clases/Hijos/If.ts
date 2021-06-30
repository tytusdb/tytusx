import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
export class If implements Instruccion{

  condicicion:any;
  sentencias:any;
  sino:any;
  fila:number;
  columna:number;
  t:string;
  constructor(condicion:any,sentencias:any,sino:any,fila:number,columna:number){
    this.condicicion=condicion;
    this.sentencias=sentencias;
    this.sino=sino;
    this.fila=fila;
    this.columna=columna;
  }
  insertSimbolsTable(node: any, anterior:string, eAnterior:any):Entorno {
    console.log("pasó por el if")
    return eAnterior;
  }
  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }

}
