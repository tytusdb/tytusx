import { Ast } from "./Ast";
export abstract class NodoAst
{
    
    public constructor(public linea:number, public columna:number){}

    public abstract Interpretar(/* arbol:Ast */):void;

    //Graph(/**/) : any;
}