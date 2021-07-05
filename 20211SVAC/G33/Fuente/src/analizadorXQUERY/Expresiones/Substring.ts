import { Nodo } from "../Arbol/Nodo";
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Excepcion } from "../Varios/Exepciones";
import { tipos, Tipo } from "../Varios/Tipo";
import { NodoAST } from "../Arbol/NodoAST";
import { NodoCST } from "../Arbol/NodoCST";

export class Substrings extends Nodo {
    expresion: Nodo;
    inicio: Nodo;
    fin: Nodo;
    constructor(expresion: Nodo, inicio: Nodo, fin: Nodo, line: Number, column: Number) {
        super(new Tipo(tipos.STRING), line, column);
        this.expresion = expresion;
        this.inicio = inicio
        this.fin = fin
    }

    execute(table: Table, tree: Tree) {
        try {
            const resultado = this.expresion.execute(table, tree);
            const ini = this.inicio.execute(table, tree);
            const fini = this.fin.execute(table, tree);
            if (resultado instanceof Excepcion) {
                return resultado;
            } else {
                if (fini == -1){
                    return resultado.substring(ini)
                }else{
                    return resultado.substring(ini, fini);
                }
            }
        } catch (err) {
            const error = new Excepcion('Semantico',
                `Ha ocurrido un error al devolver el tipo`,
                this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }

    getNodo() {
        try {
            var nodo: NodoAST = new NodoAST("");
            nodo.agregarHijo("ToString");
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
            var nodo: NodoCST = new NodoCST("SUBSTRING");
            nodo.agregarHijo("SUBSTRING");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodoCST());
            nodo.agregarHijo(",")
            nodo.agregarHijo(this.inicio.getNodoCST())
            nodo.agregarHijo(",")
            nodo.agregarHijo(this.fin.getNodoCST())
            nodo.agregarHijo(")");
            return nodo;
        } catch (err) {
            var nodo: NodoCST = new NodoCST("SUBSTRING");
            return nodo;
        }
    }

}