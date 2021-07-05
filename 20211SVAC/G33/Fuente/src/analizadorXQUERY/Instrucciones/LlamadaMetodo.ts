import { Nodo } from "../Arbol/Nodo"
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Excepcion } from "../Varios/Exepciones";
import { Tipo, tipos } from "../Varios/Tipo";
import { Simbolo } from "../Simbolos/Simbolo";
import { NodoAST } from "../Arbol/NodoAST";
import { Declaracion } from "./Declaracion";
import { Retorno } from "./Retorno";
import { Identificador } from "../Expresiones/identificador";
import { Primitivo } from "../Expresiones/Primitivo";
import { ToUpper } from "../Expresiones/uppercase";
import { NodoCST } from "../Arbol/NodoCST";

export class LlamadaMetodo extends Nodo {
    id: String;
    listaParams: Array<Nodo>;

    constructor(id: String, listaParams: Array<Nodo>, line: Number, column: Number) {
        super(null, line, column);
        this.id = id;
        this.listaParams = listaParams;
    }

    execute(table: Table, tree: Tree): any {
        const newtable = new Table(table);

        var nombre = this.id + "$";
        // var nombre = this.id;
        var index = 0;
        for (let param of this.listaParams) {
            var valor = param.execute(newtable, tree);
            // nombre += <any>param.tipo;
            index += 1;
        }
        nombre += index + "";


        let simboloMetodo: Simbolo;
        simboloMetodo = table.getVariable(nombre);
        if (simboloMetodo == null) {
            const error = new Excepcion('Semantico',
                `El metodo {${this.id}} no ha sido encontrado con esa combinacion de parametros`,
                this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
        }

        var parametros: Array<Nodo> = (<any>simboloMetodo).valor[0];
        for (let i = 0; i < parametros.length; i++) {
            var para: Declaracion;
            var crear: Declaracion;
            para = <Declaracion>parametros[i];
            crear = para;
            crear.valor = this.listaParams[i];
            crear.execute(newtable, tree);
        }

        var result: Array<Nodo> = (<any>simboloMetodo).valor[1];

        if (result) {
            for (let i = 0; i < result.length; i++) {
                const res = result[i].execute(newtable, tree);

                if (simboloMetodo.tipo.tipo == tipos.VOID) {
                    if (res instanceof Retorno) {
                        const error = new Excepcion('Semantico',
                            `No se esperaba un retorno en este metodo`,
                            res.line, res.column);
                        tree.errores.push(error);
                        tree.consola.push(error.toString());
                        return error;
                    }
                } else {
                    if (res instanceof Retorno) {
                        if (res.expresion != null) {

                            this.tipo = res.expresion.tipo;
                            res.execute(newtable, tree)
                            var retorno = res.exp;

                            if (simboloMetodo.tipo.tipo == res.expresion.tipo.tipo) {
                                return retorno;
                            } else {
                                if (simboloMetodo.tipo.tipo == tipos.DECIMAL && (res.expresion.tipo.tipo == tipos.ENTERO)) {
                                    return retorno;
                                }
                                const error = new Excepcion('Semantico',
                                    `No se puede retornar debido a que es de un tipo diferente al declarado`,
                                    res.line, res.column);
                                tree.errores.push(error);
                                tree.consola.push(error.toString());
                                return error;
                            }
                        } else {
                            const error = new Excepcion('Semantico',
                                `No se puede retornar debido a que es de un tipo diferente al declarado`,
                                res.line, res.column);
                            tree.errores.push(error);
                            tree.consola.push(error.toString());
                            return error;
                        }
                    }
                }
            }
            /*if (simboloMetodo.tipo.tipo != tipos.VOID) {
                const error = new Excepcion('Semantico',
                    `Se esperaba un retorno en esta Funcion`,
                    this.line, this.column);
                tree.errores.push(error);
                tree.consola.push(error.toString());
                return error;
            }*/
        }
        return null;
    }

    getNodo() {
        var nodo: NodoAST = new NodoAST("");
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
        nodo.agregarHijo(nodo3);
        nodo.agregarHijo("}");
        return nodo;
    }

    getNodoCST() {
        var nodo: NodoCST = new NodoCST("LLAMADA METODO");
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
        nodo.agregarHijo(nodo3);
        nodo.agregarHijo("}");
        return nodo;
    }
}