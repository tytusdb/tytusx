import Entorno from "../AST/Entorno";

export interface Expresion{

  ejecutar(Entorno:Entorno,node:any):any;

}
