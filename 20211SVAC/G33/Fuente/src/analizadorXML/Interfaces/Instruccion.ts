import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";

export interface Instruccion{
     linea:number;
     columna: number;
    
     ejecutar(ent:Entorno, arbol:AST):any ;
}