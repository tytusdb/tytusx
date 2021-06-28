import { Instruccion } from "../Interfaces/Instruccion";

export class Funcioncita implements Instruccion{

  parametro1:any;
  parametro2:any;
  parametro3:any;
  constructor(parametro1:any,parametro2:any, parametro3:any){
    this.parametro1=parametro1;
    this.parametro2=parametro2;
    this.parametro3=parametro3;
  }
  ejecutar(entorno: any) {
    throw new Error("Method not implemented.");
  }
}
