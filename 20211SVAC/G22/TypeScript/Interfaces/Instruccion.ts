import { AST } from "../Arboles/AST";
import { Entorno } from "../Arboles/Entorno";

export interface Instruccion{
     linea:number;
     columna: number;
     ejecutar(ent: Entorno, arbol: AST): any;
     
}