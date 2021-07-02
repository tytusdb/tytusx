import Entorno from "../AST/Entorno";
import { Instruccion } from "../Interfaces/Instruccion";

export class Return implements Instruccion{

  Expresion:any;
  linea:number;
  columna:number;
  t:string;
  constructor(Expresion:any,linea:number,columna:number,t:string){
    this.Expresion=Expresion;
    this.linea=linea;
    this.columna=columna;
    this.t=t;
  }
  ejecutar(Entorno: Entorno, node:any) {

    console.log("Pasó por return");
    if(this.Expresion!="nothing"){
      let retorno=this.Expresion.ejecutar(Entorno,this.Expresion);
      if(retorno.length!=undefined && !(retorno instanceof String)){
        let cadenita="";
        retorno.forEach(element => {
          cadenita+=element+"\n"
        });
        return cadenita
      }
      return retorno
    }else{
      return "return"
    }

  }
}
