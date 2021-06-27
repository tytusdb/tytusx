import { Instruccion } from './../Interfaces/Instruccion';
import { Parametros } from './Parametros';
import { Tipo } from './Tipo';
export default class Funcion implements Instruccion{

  prefijo:string;
  nombre:string;
  parametros:Array<Parametros>;
  tipoRetorno:Tipo;
  sentencias:any;
  linea:number;
  columna:number;
  constructor(prefijo:string,nombre:string, parametros:Array<Parametros>,tipoRetorno:Tipo, sentencias:any, linea:number,columna:number){
    this.prefijo=prefijo;
    this.nombre=nombre,
    this.parametros=parametros;
    this.tipoRetorno=tipoRetorno;
    this.sentencias=sentencias;
    this.linea=linea;
    this.columna=columna;
  }
  ejecutar(entorno: any) {

  }

}
