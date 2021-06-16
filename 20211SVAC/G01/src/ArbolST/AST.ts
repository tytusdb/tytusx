import { Instruccion } from "../Interfaces/Instruccion";
//test pull
export class AST{
    
    public instrucciones:Array<Instruccion>

    constructor(instrucciones:Array<Instruccion>){
        this.instrucciones = instrucciones;

    }

}