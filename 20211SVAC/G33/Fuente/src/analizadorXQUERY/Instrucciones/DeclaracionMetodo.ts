import { Nodo } from "../Arbol/Nodo"
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Excepcion } from "../Varios/Exepciones";
import { Tipo, tipos } from "../Varios/Tipo";
import { Simbolo } from "../Simbolos/Simbolo";
import { NodoAST } from "../Arbol/NodoAST";
import { Declaracion } from "./Declaracion";
import { NodoCST } from "../Arbol/NodoCST";

export class DeclaracionMetodo extends Nodo {
    id: String;
    listaParams: Array<Nodo>;
    instrucciones: Array<Nodo>;

    constructor(tipo: Tipo, id: String, listaParams: Array<Nodo>, instrucciones: Array<Nodo>, line: Number, column: Number) {
        super(tipo, line, column);
        this.id = id;
        this.listaParams = listaParams;
        this.instrucciones = instrucciones;
    }

    execute(table: Table, tree: Tree): any {

      
        var nombre = this.id + "$";
        var index = 0;
        for (let param of this.listaParams) {
            // nombre += param.tipo;
            index += 1;
        }
        nombre += index + "";

        if (table.getVariable(nombre) == null) {
            var tipo2 = new Tipo(tipos.FUNCION);
       
            var metodo = new Simbolo(this.tipo, nombre, [this.listaParams, this.instrucciones], tipo2, this.line, this.column);
            table.setVariable(metodo)
            tree.Variables.push(metodo);
        } else {
            const error = new Excepcion('Semantico',
                `El metodo {${nombre.split("$",1)[0]}} ya ha sido creado con anterioridad `,
                this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }

    getNodo() {
        var nodo: NodoAST = new NodoAST("");
        if (this.tipo.tipo == tipos.VOID) {
            nodo.agregarHijo("Void");
        } else {
            nodo.agregarHijo(this.tipo + "");
        }
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("(");
        if (this.listaParams.length != 0) {
            var nodo2: NodoAST = new NodoAST("");
            var index = 1;
            for (let i = 0; i < this.listaParams.length; i++) {
                var param = <Declaracion>this.listaParams[i]
                var nodo3: NodoAST = new NodoAST(param.tipo + "");
                nodo3.agregarHijo(param.id + "");
                nodo2.agregarHijo(nodo3);
            }
            nodo.agregarHijo(nodo2);
        }

        nodo.agregarHijo(")");
        nodo.agregarHijo("{");

        var nodo3: NodoAST = new NodoAST("");
        for (let i = 0; i < this.instrucciones.length; i++) {
            nodo3.agregarHijo(this.instrucciones[i].getNodo());
        }
        nodo.agregarHijo(nodo3);
        nodo.agregarHijo("}");
        return nodo;
    }

    getNodoCST() {
        var nodo: NodoCST = new NodoCST("DECLARACION METODO");
        if (this.tipo.tipo == tipos.VOID) {
            nodo.agregarHijo("Void");
        } else {
            nodo.agregarHijo(this.tipo + "");
        }
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("(");
        if (this.listaParams.length != 0) {
            var nodo2: NodoCST = new NodoCST("Parametros");
            var index = 1;
            for (let i = 0; i < this.listaParams.length; i++) {
                var param = <Declaracion>this.listaParams[i]
                var nodo3: NodoCST = new NodoCST(param.tipo + "");
                nodo3.agregarHijo(param.id + "");
                nodo2.agregarHijo(nodo3);
            }
            nodo.agregarHijo(nodo2);
        }

        nodo.agregarHijo(")");
        nodo.agregarHijo("{");

        var nodo3: NodoCST = new NodoCST("INSTRUCCIONES");
        for (let i = 0; i < this.instrucciones.length; i++) {
            nodo3.agregarHijo(this.instrucciones[i].getNodoCST());
        }
        nodo.agregarHijo(nodo3);
        nodo.agregarHijo("}");
        return nodo;
    }
}