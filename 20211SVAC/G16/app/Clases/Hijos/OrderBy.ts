import { Instruccion } from './../Interfaces/Instruccion';
export class OrderBy implements Instruccion{

  pivote:any;
  constructor(pivote:any){
    this.pivote=pivote;
  }
  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }
}
