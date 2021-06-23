import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import NodoAST from "../AST/NodoAST";
import { Expresion } from "../Interface/Expresion";
import { Instruccion } from "../Interface/Instruction";
import { Valor } from "./Valor";

export class Ruta extends Instruccion{
    
    
    private typeBarra:string;
    private expresion: Valor

    constructor(col:number,typeBarra:string, expresion:Valor){
         super(col);
         this.typeBarra = typeBarra;
         this.expresion = expresion
    }

    public evaluar(): Simbolo {
         throw new Error("Method not implemented.");
    }

    public concatenar(): string {
        var cadena:string = "";
        
        cadena += this.typeBarra + this.expresion.concatenar()

        return cadena;
    }

    public ast(): NodoAST {
        var ruta = new NodoAST("Ruta")
        ruta.addHijoSimple(this.typeBarra)
        ruta.addHijo(this.expresion.ast())

        return ruta;
    }
}