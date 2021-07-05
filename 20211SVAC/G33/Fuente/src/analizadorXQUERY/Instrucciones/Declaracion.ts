import { Nodo } from "../Arbol/Nodo"
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Error } from "../Varios/Error";
import { esEntero, Tipo, tipos } from "../Varios/Tipo";
import { Simbolo } from "../Simbolos/Simbolo";
import { Primitivo } from "../Expresiones/Primitivo";
import { NodoAST } from "../Arbol/NodoAST";
import { NodoCST } from "../Arbol/NodoCST";

export function defal(tipo: Tipo, line: Number, column: Number) {
    if (tipo.tipo == tipos.ENTERO) {
        return new Primitivo(tipo, 0, line, column);
    } else if (tipo.tipo == tipos.DECIMAL) {
        return new Primitivo(tipo, 0.0, line, column);
    } else if (tipo.tipo == tipos.BOOLEANO) {
        return new Primitivo(tipo, true, line, column);
    } else if (tipo.tipo == tipos.CARACTER) {
        return new Primitivo(tipo, '', line, column);
    } else if (tipo.tipo == tipos.STRING) {
        return new Primitivo(tipo, "", line, column);
    }
        return ""
}

export class Declaracion extends Nodo {
    tipo: Tipo;
    id: String;
    valor: Nodo;

    constructor(tipo: Tipo, id: String, valor: Nodo, line: Number, column: Number) {
        super(tipo, line, column);
        this.id = id;
        this.valor = valor;
    }

    execute(table: Table, tree: Tree) {
        const result = this.valor.execute(table, tree);
        if (result instanceof Error) {
            return result;
        }

        let simbolo: Simbolo;
        let tipo: Tipo;

        if (isNaN(result)){
            tipo = new Tipo(tipos.STRING)
        }else{
            tipo = new Tipo(esEntero(result))
        }

        simbolo = new Simbolo(tipo, this.id, result, new Tipo(tipos.VARIABLE), this.line, this.column);
        const res = table.setVariable(simbolo);
        tree.Variables.push(simbolo);
        // if (res != null) {
        // const error = new Excepcion('Semantico',
        // res,
        // this.line, this.column);
        // tree.excepciones.push(error);
        // tree.consola.push(error.toString());
        // }
        return null;
    
    }

    getNodo() {
        var nodo: NodoAST = new NodoAST("");
        nodo.agregarHijo(this.tipo + "");
        nodo.agregarHijo(this.id);

        if (this.valor != null) {
            nodo.agregarHijo("=");
            nodo.agregarHijo(this.valor.getNodo());
        }

        return nodo;
    }

    getNodoCST() {
        var nodo: NodoCST = new NodoCST("DECLARACION");
        nodo.agregarHijo(this.tipo + "");
        nodo.agregarHijo(this.id);

        if (this.valor != null) {
            nodo.agregarHijo("=");
            nodo.agregarHijo(this.valor.getNodoCST());
        }

        return nodo;
    }
}
