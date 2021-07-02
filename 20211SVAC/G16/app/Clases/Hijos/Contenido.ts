import Entorno from '../AST/Entorno';
import { Instruccion } from './../Interfaces/Instruccion';
export class Contenido implements Instruccion{

  texto:string;
  expresion:any;
  Contenido:Contenido;
  t:string;
  constructor(texto:string,expresion:any,Contenido:Contenido){
    this.texto=texto;
    this.expresion=expresion;
    this.Contenido=Contenido;
  }
  insertSimbolsTable(node: any, anterior:string, eAnterior:any):Entorno {
    throw new Error('Method not implemented.');
    return eAnterior
  }
  ejecutar(entorno: any) {
    throw new Error('Method not implemented.');
  }
}
