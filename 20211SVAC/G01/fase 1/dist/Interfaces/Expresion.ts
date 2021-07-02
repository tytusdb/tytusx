import { AST } from "../ArbolST/AST";
import { Entorno } from "../ArbolST/Entorno";
import { Tipos } from "../ArbolST/Tipos";

export interface Expresion{
     linea:number;
     columna: number;
    
     obtenerTipo(ent:Entorno, arbol:AST):Tipos ;
     obtenerValor(ent:Entorno, arbol:AST):any;   
}