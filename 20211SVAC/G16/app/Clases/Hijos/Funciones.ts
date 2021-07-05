import { Llamado } from './Llamados.js';
import { Operacion } from './Operaciones.js';
import { Operador } from './Operador.js';
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
  cantidad:any=0
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
    console.log("__________ESTÁ EN FUNCIÓN___________")
    if(entorno.ExisteFuncion(ast.nombre,entorno)!=null){
      console.log("Ya hay una función con el mismo nombre")
    }else{
      let valor=new Valor("Función",ast,"");
      let simbolo=new Simbolo(ast.nombre,valor,entorno.nombre,ast.linea,ast.columna,-1);
      entorno.AddFuncion(simbolo);
      TableSimbols.TableSimbols.add(simbolo);
    }
  }

  ejecutar2(entorno:Entorno,parametros:Array<any>){
    let nuevo:Entorno=new Entorno("For",entorno);
    if(this.parametros!=null){
      this.parametros.ejecutar(nuevo,this.parametros)
    }

 //   if(parametros.length==nuevo.variables.length){
      for(let i=0;i<nuevo.variables.length;i++){
        nuevo.setVariable(nuevo.variables[i].Nombre,parametros[i]);
      }

      let resultado=this.sentencias.ejecutar(nuevo,this.sentencias);
      return resultado
   /* }else{
      alert("El número de parámetros no coincide con la función a llamar")
    }*/
  }



}
