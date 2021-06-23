import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import { TipoDato } from "../../InterpreteXML/TablaSimbolo/TipoDato";
import NodoAST from "../AST/NodoAST";
import { Expresion } from "../Interface/Expresion";

export class Valor extends Expresion{
    public buscar(lista: Simbolo[]): Simbolo[] {
        throw new Error("Method not implemented.");
    }
    private id:string;
    private left:Expresion;
    private right:Expresion;

    constructor( col:number, id:string,left:Expresion,right:Expresion){
         super(1,col);
         this.id = id;
         this.left = left;
         this.right = right;
    }

    public evaluar(): Simbolo {
         return new Simbolo("",TipoDato.INT, 1,0,0,0)
    }

    public concatenar(): string {
        var cadena:string = "";
        if(this.left != null){
        cadena += this.left.concatenar()
        }
        if(this.right != null){
        cadena+= this.left.concatenar()
        }
        return cadena;
    }

    public ast(): NodoAST {
        var nodo = new NodoAST("nodo");
        if(this.left != null){

            nodo.addHijo(this.left.ast())
        }
        
        if(this.right != null){
            if(this.id == "P"){
                nodo.addHijoSimple("[")
            }
            nodo.addHijo(this.right.ast())
            if(this.id == "P"){
                nodo.addHijoSimple("]")
        }
        }
        
        return nodo;
    }
}