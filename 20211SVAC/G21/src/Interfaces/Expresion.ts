import { Simbolo } from "../Entornos/Simbolo"; 

export interface Expresion{
     linea:number;
     columna: number;
    
     getValorImplicito(ent:Simbolo):any;
     
}