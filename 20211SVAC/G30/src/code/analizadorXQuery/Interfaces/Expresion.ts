import { Entorno } from "../AST/Entorno";

export interface Expresion{
     linea:number;
     columna: number;
    
     getTipo(ent:Entorno):any ;
     getValorImplicito(ent:Entorno):any;
     
}