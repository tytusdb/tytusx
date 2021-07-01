import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
export class Listado implements Instruccion{

  expresion1:any;
  expresion2:any;
  lista:any;
  t:string;
  constructor(expresion1:any,expresion2:any,lista:any){
    this.expresion1=expresion1;
    this.expresion2=expresion2;
    this.lista=lista;
  }


  ejecutar(entorno: any, node:any) {
    throw new Error('Method not implemented.');
  }



}
