import Entorno from "../AST/Entorno";
import { Instruccion } from "../Interfaces/Instruccion";

export class Return implements Instruccion{

  Expresion:any;
  linea:number;
  columna:number;
  t:string;
  constructor(Expresion:any,linea:number,columna:number){
    this.Expresion=Expresion;
    this.linea=linea;
    this.columna=columna;
  }
  ejecutar(Entorno: Entorno, node:any) {

  }
}
