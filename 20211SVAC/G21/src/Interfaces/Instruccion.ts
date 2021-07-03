import { AST } from "../AST/AST";
import { Simbolo } from "../Entornos/Simbolo";

export interface Instruccion{
     linea:number;
     columna: number;
    
     ejecutar(ent:Simbolo, arbol:AST):any ;
}