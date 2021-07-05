import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Tipo } from '../Varios/Tipo';
import { NodoAST } from "./NodoAST";

export abstract class Nodo{
    line: Number;
    column: Number;
    tipo: Tipo;

    abstract getNodo():NodoAST;

    abstract execute(table: Table, tree: Tree): any;

    constructor(tipo: Tipo, line: Number, column: Number) {
        this.tipo = tipo;
        this.line = line;
        this.column = column;
    }
}