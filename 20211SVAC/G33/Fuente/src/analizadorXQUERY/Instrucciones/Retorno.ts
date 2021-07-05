import { Nodo } from "../Arbol/Nodo";
import { NodoAST } from "../Arbol/NodoAST";
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { NodoCST } from "../Arbol/NodoCST";

export class Retorno extends Nodo {
    expresion: Nodo;
    exp: Nodo;
    constructor(expresion: Nodo, line: Number, column: Number) {
        super(null, line, column);
        this.expresion = expresion
    }

    execute(table: Table, tree: Tree) {
        if (this.expresion != null) {
            this.exp = this.expresion.execute(table, tree);
        }
        return this;
    }

    getNodo() {
        var nodo: NodoAST = new NodoAST("");
        if (this.expresion != null) {
            nodo.agregarHijo(this.expresion.getNodo());
        }

        return nodo;
    }

    getNodoCST() {
        var nodo: NodoCST = new NodoCST("RETURN");
        if (this.expresion != null) {
            nodo.agregarHijo(this.expresion.getNodoCST());
        }

        return nodo;
    }
}