import { StringLiteralType } from 'typescript';
import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
import { Return } from './Return';
export class For implements Instruccion{

  variable:string;
  variable2:string;
  condiciones:any;
  contenido:any;
  linea:number;
  columna:number;
  t: string;
  retorno:Return
  constructor(variable:string,variable2:string,condiciones:any,contenido:any,linea:number,columna:number,retorno:Return, t:string){
    this.variable=variable;
    this.variable2=variable2;
    this.condiciones=condiciones;
    this.contenido=contenido;
    this.linea=linea;
    this.columna=columna;
    this.retorno=retorno;
    this.t=t;
  }
  ejecutar(entorno: Entorno, node:any) {
    console.log("pasó por el for")
    let nuevo=new Entorno("For",entorno);
    if(this.variable=="" && this.variable2==""){
      if(this.condiciones!=null){
        //en esta sección retorna el valor de la condición
       let retorno=this.condiciones.ejecutar(nuevo,this.condiciones);
       // si el valor de la condición es diferente de nulo e indefinido
       if(retorno!=null && retorno!=undefined){
         if(this.retorno!=null){

          return this.retorno.ejecutar(nuevo,this.retorno);
         }

        }else{

        }
      }
    }else if(this.variable!="" && this.variable2==""){
      if(this.condiciones!=null){
        let retorno=this.condiciones.ejecutar(entorno,this.condiciones);
        if (this.contenido!=null){
          this.contenido.ejecutar(entorno,this.contenido);
        }
      }
    }

  }

}
