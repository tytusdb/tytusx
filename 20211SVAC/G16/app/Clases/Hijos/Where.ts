import { Operacion } from './Operaciones';
import { Instruccion } from './../Interfaces/Instruccion';
import Entorno from '../AST/Entorno';
export class Where implements Instruccion{
  Condicion:any;
  linea:number;
  columna:number;
  t:string;
  constructor(Condicion:any,linea:number,columna:number){
    this.Condicion=Condicion;
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
