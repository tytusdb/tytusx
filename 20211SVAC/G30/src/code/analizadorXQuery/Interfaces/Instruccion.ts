import { Entorno } from "../AST/Entorno";

export interface Instruccion{
     linea:number;
     columna: number;
    
     ejecutar(ent:Entorno):any ;
}