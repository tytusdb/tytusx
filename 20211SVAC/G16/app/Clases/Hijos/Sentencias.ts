import Entorno from "../AST/Entorno";
import { Instruccion } from "../Interfaces/Instruccion";
export class Sentencia implements Instruccion{
  sentencia:Sentencia;
  lista:Sentencia;
  t:string;
  constructor(sentencia:Sentencia,lista:Sentencia,t:string){
    this.sentencia=sentencia;
    this.lista=lista;
    this.t=t;
  }

  ejecutar(entorno: Entorno, node:any) {
    if(this.lista!=null){
      this.lista.ejecutar(entorno,node);
    }

    if(this.sentencia!=null){
      let result= this.sentencia.ejecutar(entorno,node);
      console.log(entorno)
      return result
    }
  }

}
