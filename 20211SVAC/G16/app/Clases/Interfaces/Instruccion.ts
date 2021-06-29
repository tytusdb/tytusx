import Entorno from "../AST/Entorno"
export interface Instruccion{

  t:string;
  ejecutar(entorno:any, node:any):any;

}
