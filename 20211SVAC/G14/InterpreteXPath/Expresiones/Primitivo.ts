import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import { TipoDato } from "../../InterpreteXML/TablaSimbolo/TipoDato";
import NodoAST from "../AST/NodoAST";
import { Expresion } from "../Interface/Expresion";

export class Primitivo extends Expresion{
    
    
    private tipo:TipoDato;
    public valor:any;
    public fila:number;
    private col:number;
    constructor(fila:number, col:number, tipo:TipoDato, valor:any){
        super(fila, col);
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.col = col;
    }

    public evaluar(): Simbolo {
        return new Simbolo("",this.tipo, this.valor,this.fila,this.col)
    }
    public ast(): NodoAST {
        var nodo =  new NodoAST(this.valor);
        return nodo;
    }
    public concatenar() {
        throw new Error("Method not implemented.");
    }
    public buscar(lista: Simbolo[], isFinal: boolean): Simbolo[] {
        throw new Error("Method not implemented.");
    }
    
}