import { Instruccion } from "./Instruccion";

export class AST{
    
    public instrucciones:Array<Instruccion>

    constructor(instrucciones:Array<Instruccion>){
        this.instrucciones = instrucciones;
    }

}