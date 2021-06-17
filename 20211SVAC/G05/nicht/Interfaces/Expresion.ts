import { AST } from "../Simbolo/AST";
import { Entorno } from "../Simbolo/Entorno";
import { Tipo } from "../Simbolo/Tipo";

export interface Expresion{
     linea:number;
     columna: number;
    
     getTipo(ent:Entorno, arbol:AST):Tipo ;
     getValorImplicito(ent:Entorno, arbol:AST):any;     
}