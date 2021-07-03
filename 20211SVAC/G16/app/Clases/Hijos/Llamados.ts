import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
import Funcion from './Funciones.js';
import { Operacion } from './Operaciones.js';
import { Operador } from './Operador.js';
export class Llamado implements Instruccion{

  prefijos:string;
  identificador:string;
  parametros:any;
  t:string;
  array:Array<Number>=new Array<Number>()
  constructor(prefijos:string,identificador:string,parametros:any,t:string){
    this.prefijos=prefijos;
    this.identificador=identificador;
    this.parametros=parametros;
    this.t=t;
  }
  ejecutar(entorno: Entorno,node:any) {
    console.log("__________ESTÁ EN LLAMADO DE FUNCIÓN__________");
    let funcion=entorno.ExisteFuncion(this.identificador,entorno)
    if(funcion!=null){
      let func=funcion.Valor.valor
      if(func!=null){
        if(func instanceof Funcion){
          this.array=[]
          this.ObtenerValor(this.parametros,entorno)
          console.log(this.array)
          return func.ejecutar2(entorno,this.array);
        }else{
          console.log("F")
        }
      }
    }else{
      alert("La función que desea llamar no existe en el entorno actual")
    }

  }

  ObtenerValor(parametro:any,entorno:Entorno){
    if(parametro instanceof Array){
      parametro.forEach(param=>{
        if(param instanceof Array){
          this.ObtenerValor(param,entorno);
        }else{
          let resultado=param.ejecutar(entorno,param);
          if(resultado!=undefined){
          this.array.push(resultado)
          }
        }
      })
    }
  }

}
