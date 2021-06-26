import { Operacion } from './Operaciones';
import { Instruccion } from './../Interfaces/Instruccion';
export class Where implements Instruccion{
  Condicion:any;
  constructor(Condicion:any){
    this.Condicion=Condicion;
  }


  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }

}
