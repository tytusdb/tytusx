import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
export class OrderBy implements Instruccion{

  pivote:any;
  linea:number;
  columna:number;
  t:string;
  constructor(pivote:any,linea:number,columna:number){
    this.pivote=pivote;
    this.linea=linea;
    this.columna=columna;
  }
  insertSimbolsTable(node: any, anterior:string, eAnterior:any):Entorno {
    throw new Error('Method not implemented.');
    return eAnterior
  }
  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }
}
