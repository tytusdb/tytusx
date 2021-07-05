import { Nodo } from "../Arbol/Nodo";
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Tipo } from '../Varios/Tipo';
import { NodoAST } from "../Arbol/NodoAST";


// Esta clase crea un nodo del tipo primitivo, ya sea int, double, string, char, boolean

export class Primitivo extends Nodo{
    valor: Object;

    constructor(tipo:Tipo, valor: Object, line: Number, column: Number){
        super(tipo, line, column);
        this.valor = valor;
    }

    execute(table: Table, tree: Tree) {
        return this.valor;
    }

    getNodo(){
        var nodo:NodoAST  = new NodoAST("PRIMITIVO");
        nodo.agregarHijo(this.valor+'');
        return nodo;
    }
}