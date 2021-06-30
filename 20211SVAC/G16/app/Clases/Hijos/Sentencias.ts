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
      this.lista.ejecutar(entorno,this.lista);
    }

    if(this.sentencia!=null){
      this.sentencia.ejecutar(entorno,this.sentencia);
    }
  }

}
