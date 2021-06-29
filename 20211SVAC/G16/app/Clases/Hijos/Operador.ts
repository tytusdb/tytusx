import Entorno from '../AST/Entorno';
import { Expresion } from './../Interfaces/Expresion';
import { Tipo } from "./Tipo.js";

export class Operador implements Expresion{

    tipo:Tipo;
    valor:any;
    etiqueta:any;
    constructor(tipo:Tipo,valor:any,etiqueta:any){
      this.tipo=tipo;
      this.valor=valor;
      this.etiqueta=etiqueta;
    }
  ejecutar(Entorno: Entorno, node: any) {
    if(this.etiqueta==null){
      let respuesta=this.VerificarTipo(Entorno);
      if(respuesta==null){
        return null
      }
      return respuesta
    }

  }

  VerificarTipo(entorno:Entorno):any{
    if(this.tipo==Tipo.STRING){
      try{
        let str=String(this.valor)
        let newCad:string=""
        for(let i=0;i<str.length;i++){
          if(i!=0 && i!=str.length-1){
            newCad+=str[i]
          }
        }
        return String(newCad)
      }catch(Error){
        //error semántico
        return null;
      }
    }else if(this.tipo==Tipo.DECIMAL || this.tipo==Tipo.DOUBLE || this.tipo==Tipo.FLOAT){
      try{
        return parseFloat(this.valor)
      }catch(Error){
        //error semántico
        return null;
      }
    }else if(this.tipo==Tipo.INTEGER){
      try{
        return parseInt(this.valor);
      }catch(Error){
        //error semántico
        return null;
      }
    }else if(this.tipo==Tipo.BOOLEAN){
      try{
        return Boolean(this.valor)
      }catch(Error){
        return null;
      }
    }else if(this.tipo==Tipo.VARIABLE){
      let variable=entorno.buscarVariable(this.valor,entorno);
      if(variable!=null){
        return variable.Valor.valor
      }else{
        //No existe la variable, error semántico
        return null;
      }
    }else{
      //error semántico
      return null
    }
}
}
