import { Instruccion } from './../Interfaces/Instruccion';
export class If implements Instruccion{

  condicicion:any;
  sentencias:any;
  sino:any;
  fila:number;
  columna:number;
  constructor(condicion:any,sentencias:any,sino:any,fila:number,columna:number){
    this.condicicion=condicion;
    this.sentencias=sentencias;
    this.sino=sino;
    this.fila=fila;
    this.columna=columna;
  }
  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }

}
