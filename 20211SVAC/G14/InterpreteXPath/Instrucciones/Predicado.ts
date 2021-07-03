import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import NodoAST from "../AST/NodoAST";
import { Expresion } from "../Interface/Expresion";
import { Instruccion } from "../Interface/Instruction";

export class Predicado extends Expresion{
    
    
    
    private exp:Expresion;

    constructor(col:number,exp:Expresion){
         super(0,col);
         this.exp = exp;
    }

    public evaluar(): Simbolo {
        var res:Simbolo =  this.exp.evaluar();
        return res;    // Deberia retornar la lista
    }

    public concatenar(): string {
        var cadena:string = "";
        
        cadena += this.exp.concatenar()

        return cadena;
    }

    public ast(): NodoAST {
        var predicado = new NodoAST("PREDICADO")
        predicado.addHijo(this.exp.ast())

        return predicado;
    }

    public buscar(lista: Simbolo[], isFinal: boolean): Simbolo[] {
        throw new Error("Method not implemented.");
    }
}