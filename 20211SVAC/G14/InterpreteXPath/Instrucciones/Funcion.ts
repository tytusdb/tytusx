import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import NodoAST from "../AST/NodoAST";
import { Expresion } from "../Interface/Expresion";
import { Instruccion } from "../Interface/Instruction";
import { Cuerpo } from "./Cuerpo";

export enum TipoF {
    ACCESO,  //     child::position()
    FUNCION  //     ()
}
export class Funcion extends Expresion{
    
    
    
    private id:string;
    private tipo:TipoF;
    private nodetest: any;

    constructor(col:number, id:string, tipo:TipoF, nodetest:any){
         super(0,col);
         this.id = id;   
         this.tipo =tipo;
         this.nodetest = nodetest;
    }

    public evaluar(): Simbolo {
         throw new Error("Method not implemented.");
    }

    public concatenar(): string {
        var cadena:string = "";
        if(this.tipo == TipoF.ACCESO)
        {
            cadena += this.id+ "::";
        }else{
            cadena += this.id+ "()";
        }
        if(this.nodetest != null){
            cadena += this.nodetest.concatenar()
        }
        return cadena;
    }

    public ast(): NodoAST {
        var nodo = new NodoAST("FUNCION")

        if(this.tipo == TipoF.FUNCION)
        {   
            nodo.addHijoSimple(this.id)
            nodo.addHijoSimple("(")
            nodo.addHijoSimple(")")
        }else{
            nodo.addHijoSimple(this.id)
            nodo.addHijoSimple("::")
        }
        if(this.nodetest != null){
            nodo.addHijo(this.nodetest.ast())
        }
        return nodo;
    }

    public buscar(lista: Simbolo[]): Simbolo[] {
        throw new Error("Method not implemented.");
    }
}