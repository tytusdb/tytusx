import { NodeAst } from "./NodeAst";

export class Ast{

    public Instrucciones:Array<NodeAst>;

    constructor(Instrucciones:Array<NodeAst>)    
    {
        this.Instrucciones = Instrucciones;
    }
}