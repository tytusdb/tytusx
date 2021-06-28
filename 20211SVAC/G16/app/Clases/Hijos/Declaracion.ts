import { Instruccion } from './../Interfaces/Instruccion';
import { Tipo } from './Tipo';

export class Declaracion implements Instruccion{

  nombre:string;
  tipo:Tipo;
  valor:any;
  linea:number;
  columna:number;
  constructor(nombre:string,valor:any,linea:number,columna:number) {
    this.nombre=nombre;
    this.valor=valor;
    this.linea=linea;
    this.columna=columna;
  }

  ejecutar(entorno: any) {

  }



}
