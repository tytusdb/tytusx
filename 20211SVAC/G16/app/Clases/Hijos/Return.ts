import Entorno from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";

export class Return implements Expresion{

  Expresion:any;
  linea:number;
  columna:number;
  constructor(Expresion:any,linea:number,columna:number){
    this.Expresion=Expresion;
    this.linea=linea;
    this.columna=columna;
  }
  ejecutar(Entorno: Entorno) {
    throw new Error("Method not implemented.");
  }
}
