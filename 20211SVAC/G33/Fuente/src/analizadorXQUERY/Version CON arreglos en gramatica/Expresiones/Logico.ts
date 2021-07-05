import { Nodo } from "../Arbol/Nodo";
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Error } from "../Varios/Error";
import { tipos, Tipo } from "../Varios/Tipo";
import { NodoAST } from "../Arbol/NodoAST";

export class Logico extends Nodo {
    operadorIzq: Nodo;
    operadorDer: Nodo;
    operador: String;

    constructor(operadorIzq: Nodo, operadorDer: Nodo, operador: String, line: Number, column: Number) {
        super(new Tipo(tipos.BOOLEANO), line, column);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.operador = operador;
    }

    execute(table: Table, tree: Tree) {
        if (this.operadorIzq !== null) {
            const resultadoIzq = this.operadorIzq.execute(table, tree);
            if (resultadoIzq instanceof Error) {
                return resultadoIzq;
            }
            const resultadoDer = this.operadorDer.execute(table, tree);
            if (resultadoDer instanceof Error) {
                return resultadoDer;
            }

            if (this.operador === '||') {
                if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO && this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq || resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `No se puede operar OR con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador === '&&') {
                if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO && this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq && resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `No se puede operar AND con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `Error, Operador desconocido`,
                    this.line, this.column);
                tree.errores.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        } else {
            const resultadoDer = this.operadorDer.execute(table, tree);
            if (resultadoDer instanceof Error) {
                return resultadoDer;
            }
            if (this.operador === '!') {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return !resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `No se puede operar Not con el tipo ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `Error, Operador desconocido`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        }
    }

    getNodo() {
        var nodo: NodoAST  = new NodoAST("LOGICO");
        if(this.operadorIzq != null){
            nodo.agregarHijo(this.operadorIzq.getNodo());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodo());
            
        }else{
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodo());
        } 
        return nodo;
    }
}
