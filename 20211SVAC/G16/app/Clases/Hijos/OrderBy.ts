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
  ejecutar(entorno: Entorno, node:any) {
    console.log("pasó por el order by")
    console.log(entorno)
  }
}
