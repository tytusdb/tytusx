import { AST } from "../Simbolo/AST";
import { Entorno } from "../Simbolo/Entorno";

export interface Instruccion{
     linea:number;
     columna: number;
    
     ejecutar(ent:Entorno, arbol:AST):any ;
}