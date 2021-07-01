import Entorno from "../AST/Entorno";
import { Instruccion } from "../Interfaces/Instruccion";

export class Funcioncita implements Instruccion{

  parametro1:any;
  parametro2:any;
  parametro3:any;
  linea:number;
  columna:number;
  t:string;
  constructor(parametro1:any,parametro2:any, parametro3:any,linea:number,columna:number){
    this.parametro1=parametro1;
    this.parametro2=parametro2;
    this.parametro3=parametro3;
    this.linea=linea;
    this.columna=columna;
  }
  insertSimbolsTable(node: any, anterior:string, eAnterior:any):Entorno {
    throw new Error('Method not implemented.');
    return eAnterior
  }
  ejecutar(entorno: any) {
    throw new Error("Method not implemented.");
  }
}
