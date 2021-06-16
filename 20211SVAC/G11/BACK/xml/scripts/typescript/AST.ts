import { Elemento } from "./Elemento";

export class AST{
    
    public instrucciones:Array<Elemento>

    constructor(instrucciones:Array<Elemento>){
        this.instrucciones = instrucciones;
    }

}