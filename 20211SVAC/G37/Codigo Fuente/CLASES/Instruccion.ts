import { AST } from "./AST";
import { Ambito } from "./Ambito";

export interface Instruccion{
     linea:number;
     columna: number;
    
     ejecutar(ent:Ambito, arbol:AST):any ;
}