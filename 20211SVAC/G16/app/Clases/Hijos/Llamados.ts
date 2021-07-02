import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
export class Llamado implements Instruccion{

  prefijos:string;
  identificador:string;
  parametros:any;
  t:string;
  constructor(prefijos:string,identificador:string,parametros:any){
    this.prefijos=prefijos;
    this.identificador=identificador;
    this.parametros=parametros;
  }
  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }

}
