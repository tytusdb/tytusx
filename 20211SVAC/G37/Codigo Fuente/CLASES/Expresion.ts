import { AST } from "./AST";
import { Ambito } from "./Ambito";
import { Tipo } from "./Tipo";

export interface Expresion{
     linea:number;
     columna: number;
    
     getTipo(ent:Ambito, arbol:AST):Tipo;
     getValorImplicito(ent:Ambito, arbol:AST):any;
     
}