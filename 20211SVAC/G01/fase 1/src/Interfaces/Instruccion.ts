import { AST } from "../ArbolST/AST";
import { Entorno } from "../ArbolST/Entorno";

export interface Instruccion{
     linea:number;
     columna: number;
    
     ejecutar(ent:Entorno, arbol:AST):any ;
}