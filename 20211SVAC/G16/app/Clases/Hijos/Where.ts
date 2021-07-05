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

  ejecutar(entorno: Entorno, node:any) {
   console.log("pasó por el where")
   return this.Condicion.ejecutar(entorno,node);

  }


}
