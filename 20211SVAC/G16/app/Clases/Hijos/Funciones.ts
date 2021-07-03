import { Operador } from './Operador.js';
import { Instruccion } from './../Interfaces/Instruccion';
import { Parametros } from './Parametros';
import { Tipo } from './Tipo';
const TableSimbols=require("../AST/TSXQuery.js");
import Valor from '../AST/Valor';
import Simbolo from '../AST/Simbolo';
import Entorno from '../AST/Entorno';
import { NullTemplateVisitor } from '@angular/compiler';
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
    console.log("pasó por función")
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

    this.cantidad=0;
    this.getCantidad(parametros)
    if(parseInt(this.cantidad,10)!=nuevo.variables.length){
      alert("El número de parámetros no coincide")
      return
    }else{
      //SE ASIGNA EL VALOR A LAS VARIABLES
      this.getParametros(parametros,nuevo)
      let resultado=this.sentencias.ejecutar(nuevo,this.sentencias);
      return resultado
    }
  }


  getParametros(params:any,entorno:Entorno){
    let entro=false;
    if(params.length!=undefined){
      params.forEach(element => {
        if(element instanceof Operador){
          let valor= element.ejecutar(entorno,element);
          entorno.variables.forEach(variable=>{
            if(variable.Valor.valor==null && valor!=null && entro==false){
              entorno.setVariable(variable.Nombre,valor)
              entro=true;
            }
          })
        }else{
          this.getParametros(element,entorno)
        }
      });
    }else{
      if(params instanceof Operador){
        let valor= params.ejecutar(entorno,params);
        entorno.variables.forEach(variable=>{
          if(variable.Valor.valor==null && valor!=null && entro==false){
            entorno.setVariable(variable.Nombre,valor)
            entro=true;
          }
        })
      }
    }
  }

  getCantidad(params:any){
    if(params.length!=undefined){
      params.forEach(element => {
        if(element.length==undefined){
          this.cantidad=this.cantidad+1;
          console.log("*************************")
          console.log(this.cantidad)
        }else{
          this.getCantidad(element)
        }
      });
    }else{
        this.cantidad=this.cantidad+1;
    }
  }


}
