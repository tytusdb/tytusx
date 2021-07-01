import { Instruccion } from './../Interfaces/Instruccion';
import { Parametros } from './Parametros';
import { Tipo } from './Tipo';
const TableSimbols=require("../AST/TSXQuery.js");
import Valor from '../AST/Valor';
import Simbolo from '../AST/Simbolo';
import Entorno from '../AST/Entorno';
export default class Funcion implements Instruccion{

  prefijo:string;
  nombre:string;
  parametros:Parametros;
  tipoRetorno:Tipo;
  sentencias:any;
  linea:number;
  columna:number;
  t:string;
  constructor(prefijo:string,nombre:string, parametros:Parametros,tipoRetorno:Tipo, sentencias:any, linea:number,columna:number,t:string){
    this.prefijo=prefijo;
    this.nombre=nombre,
    this.parametros=parametros;
    this.tipoRetorno=tipoRetorno;
    this.sentencias=sentencias;
    this.linea=linea;
    this.columna=columna;
    this.t=t;
  }

  ejecutar(entorno: any,ast:any) {
    if(entorno.ExisteFuncion(ast.nombre)!=null){
      console.log("Ya hay una función con el mismo nombre")
    }else{
      let valor=new Valor("Función",ast,"");
      let simbolo=new Simbolo(ast.nombre,valor,entorno.nombre,ast.linea,ast.columna,-1);
      entorno.AddFuncion(simbolo);
      TableSimbols.TableSimbols.add(simbolo);
    }
  }


}
