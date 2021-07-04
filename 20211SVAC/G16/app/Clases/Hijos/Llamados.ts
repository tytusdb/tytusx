import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
import Funcion from './Funciones.js';
export class Llamado implements Instruccion{

  prefijos:string;
  identificador:string;
  parametros:any;
  t:string;
  constructor(prefijos:string,identificador:string,parametros:any,t:string){
    this.prefijos=prefijos;
    this.identificador=identificador;
    this.parametros=parametros;
    this.t=t;
  }
  ejecutar(entorno: Entorno,node:any) {
    console.log("pasó por llamado de función");
    console.log(entorno)
    let funcion=entorno.ExisteFuncion(this.identificador,entorno)
    if(funcion!=null){
      let func=funcion.Valor.valor
      if(func!=null){
        if(func instanceof Funcion){
          return func.ejecutar2(entorno,this.parametros);
        }else{
          console.log("F")
        }
      }
    }else{
      alert("La función que desea llamar no existe en el entorno actual")
    }

  }

}
