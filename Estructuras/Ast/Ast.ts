import { NodoAst } from "./NodoAst";

export class Ast{

    public Instrucciones:Array<NodoAst>;

    constructor(Instrucciones:Array<NodoAst>)    
    {
        this.Instrucciones = Instrucciones;
    }
}