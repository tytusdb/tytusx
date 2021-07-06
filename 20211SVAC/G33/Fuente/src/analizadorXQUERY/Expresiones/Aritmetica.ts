import { Nodo } from "../Arbol/Nodo";
import { NodoAST } from "../Arbol/NodoAST";
import { NodoCST } from "../Arbol/NodoCST";
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Error } from "../Varios/Error";
import { tipos, Tipo } from "../Varios/Tipo";


function esEntero(numero: number) {
    if (numero % 1 == 0) {
        return true;
    } else {
        return false;
    }
}

export class Aritmetica extends Nodo {
    operadorIzq: Nodo;
    operadorDer: Nodo;
    operador: String;

    constructor(operadorIzq: Nodo, operadorDer: Nodo, operador: String, line: Number, column: Number) {
        super(null, line, column);
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
            const resultadoDerecho = this.operadorDer.execute(table, tree);
            if (resultadoDerecho instanceof Error) {
                return resultadoDerecho;
            }

            if (this.operador === '+') {
                //ENTERO + 
                if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                    //ENTERO + ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return resultadoIzq + resultadoDerecho;
                    //ENTERO + DECIMAL = DECIMAL
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq + resultadoDerecho;
                    //ENTERO + STRING = STRING
                    } else if (this.operadorDer.tipo.tipo === tipos.STRING) {
                        this.tipo = new Tipo(tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    }
                //DOUBLE + 
                } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                    //DOUBLE + ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq + resultadoDerecho;
                    //DOUBLE + DOUBLE = DOUBLE
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq + resultadoDerecho;
                    //DOUBLE + STRING = STRING
                    } else if (this.operadorDer.tipo.tipo === tipos.STRING) {
                        this.tipo = new Tipo(tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    }
                //STRING +
                } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                    //STRING + ENTERO = STRING
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    //STRING + DOUBLE = STRING
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    //STRING + STRING = STRING
                    } else if (this.operadorDer.tipo.tipo === tipos.STRING) {
                        this.tipo = new Tipo(tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se pueden Sumar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                } else {
                    const error = new Error('Semantico',
                        `No se pueden Sumar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador === '-') {
                //ENTERO - 
                if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                    //ENTERO - ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return resultadoIzq - resultadoDerecho;
                    //ENTERO - DECIMAL = DECIMAL
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq - resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se pueden Restar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                //DOUBLE -
                } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                    //DOUBLE - ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq - resultadoDerecho;
                    //DOUBLE - DOUBLE = DOUBLE
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq - resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se pueden Restar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                } else {
                    const error = new Error('Semantico',
                        `No se pueden Restar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador === '*') {
                //ENTERO * 
                if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                    //ENTERO * ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return resultadoIzq * resultadoDerecho;
                    //ENTERO * DECIMAL = DECIMAL
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq * resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se pueden Multiplicar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                //DOUBLE *
                } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                    //DOUBLE * ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq * resultadoDerecho;
                    //DOUBLE * DOUBLE = DOUBLE
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq * resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se pueden Multiplicar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                } else {
                    const error = new Error('Semantico',
                        `No se pueden Multiplicar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador === '/') {
                //DIVISION SOBRE 0
                if (resultadoDerecho === 0) {
                    const error = new Error('Semantico',
                        `Error aritmetico, La division con cero no esta permitida`,
                        this.line, this.column);
                    tree.errores.push(error);
                    return error;
                }
                //ENTERO / 
                if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                    //ENTERO / ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho;
                        //DECIMAL / DECIMAL = DECIMAL
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se pueden Dividir los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //DOUBLE /
                } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                    //DOUBLE / ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho;
                        //DOUBLE / DOUBLE = DOUBLE
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se pueden Dividir los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                } else {
                    const error = new Error('Semantico',
                        `No se pueden Dividir los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador === '%') {
                //ENTERO % 
                if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                    //ENTERO % ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq % resultadoDerecho;
                    //ENTERO % DECIMAL = DECIMAL
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq % resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se puede aplicar modulo con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                //DOUBLE %
                } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                    //DOUBLE % ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq % resultadoDerecho;
                    //DOUBLE % DOUBLE = DOUBLE
                    } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return resultadoIzq % resultadoDerecho;
                    } else {
                        const error = new Error('Semantico',
                            `No se puede aplicar modulo los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                            this.line, this.column);
                        tree.errores.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                } else {
                    const error = new Error('Semantico',
                        `No se puede aplicar modulo los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
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
        }
    }

    getNodo(){
        var nodo:NodoAST = new NodoAST("");
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

    getNodoCST() {
        var nodo:NodoCST = new NodoCST("ARITMETICA");
        if(this.operadorIzq != null){
            nodo.agregarHijo(this.operadorIzq.getNodoCST());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodoCST());
            
        }else{
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodoCST());
        } 
        return nodo;
    }
}