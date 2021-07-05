import { Nodo } from "../Arbol/Nodo";
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Simbolo } from "../Simbolos/Simbolo";
import { Error } from "../Varios/Error";
import { NodoAST } from "../Arbol/NodoAST";

export class Identificador extends Nodo {
    id: String;
    valor: any;

    constructor(id: String, line: Number, column: Number) {
        super(null, line, column);
        this.id = id;
    }

    execute(table: Table, tree: Tree) {
        let variable: Simbolo;
        variable = table.getVariable(this.id);
        if (variable == null) {
            const error = new Error('Semantico',
                `La variable {${this.id}} no ha sido encontrada`,
                this.line, this.column);
            tree.errores.push(error);
            return error;
        }
        this.tipo = variable.tipo;
        this.valor = variable.valor;
        return variable.valor;
    }

    getNodo() {
        var nodo:NodoAST  = new NodoAST("IDENTIFICADOR");
        var nodo2:NodoAST  = new NodoAST(this.id + "");
        nodo2.agregarHijo(this.valor + "");
        nodo.agregarHijo(nodo2);
        return nodo;
    }
}