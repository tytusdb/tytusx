import { Nodo } from "../../InterpreteXPath/AST/Nodo";
import NodoAST from "../../InterpreteXPath/AST/NodoAST";

export class Atributo extends Nodo{
    identificador:string;
    valor:string;
    fila: number;
    columna: number;

    constructor(id:string, valor:string, fila:number, columna:number){
        super(fila, columna)
        this.identificador = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    obtenerNodos(): Array<NodoAST> {
        var nodo = new NodoAST("ATRIBUTO");
        nodo.addHijoSimple(this.identificador)
        nodo.addHijoSimple("=")
        nodo.addHijoSimple(this.valor)
        return [nodo, nodo];
    }

}