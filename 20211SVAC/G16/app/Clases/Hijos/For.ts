import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
export class For implements Instruccion{

  variable:string;
  variable2:string;
  condiciones:any;
  contenido:any;
  linea:number;
  columna:number;
  t: string;
  constructor(variable:string,variable2:string,condiciones:any,contenido:any,linea:number,columna:number){
    this.variable=variable;
    this.variable2=variable2;
    this.condiciones=condiciones;
    this.contenido=contenido;
    this.linea=linea;
    this.columna=columna;
  }
  ejecutar(entorno: any, node:any) {

  }

}
