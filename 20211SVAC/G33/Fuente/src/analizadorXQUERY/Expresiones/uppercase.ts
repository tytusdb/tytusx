import { Nodo } from "../Arbol/Nodo";
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Excepcion } from "../Varios/Exepciones";
import { tipos, Tipo } from "../Varios/Tipo";
import { NodoAST } from "../Arbol/NodoAST";
import { NodoCST } from "../Arbol/NodoCST";

export class ToUpper extends Nodo {
    expresion: Nodo;
    constructor(expresion: Nodo, line: Number, column: Number) {
        super(new Tipo(tipos.STRING), line, column);
        this.expresion = expresion;
    }

    execute(table: Table, tree: Tree) {
        try {
            const resultado = this.expresion.execute(table, tree);
            if (resultado instanceof Excepcion) {
                return resultado;
            } else {
                return resultado.toUpperCase();
            }
        } catch (err) {
            const error = new Excepcion('Semantico',
                `Ha ocurrido un error al convertir en mayusculas`,
                this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }

    getNodo() {
        try {
            var nodo: NodoAST = new NodoAST("");
            nodo.agregarHijo("ToUpper");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
        } catch (err) {
            var nodo: NodoAST = new NodoAST("");
            return nodo;
        }
    }

    getNodoCST() {
        try {
            var nodo: NodoCST = new NodoCST("TOUPPER");
            nodo.agregarHijo("ToUpper");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodoCST());
            nodo.agregarHijo(")");
            return nodo;
        } catch (err) {
            var nodo: NodoCST = new NodoCST("ToUpper");
            return nodo;
        }
    }
}