import { Instruccion } from './../Interfaces/Instruccion';
export class For implements Instruccion{

  variable:string;
  variable2:string;
  condiciones:any;
  contenido:any;
  constructor(variable:string,variable2:string,condiciones:any,contenido:any){
    this.variable=variable;
    this.variable2=variable2;
    this.condiciones=condiciones;
    this.contenido=contenido;
  }
  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }

}
