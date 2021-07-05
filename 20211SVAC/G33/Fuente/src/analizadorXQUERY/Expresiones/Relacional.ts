import { Nodo } from "../Arbol/Nodo";
import { Table } from "../Simbolos/Table";
import { Tree } from "../Simbolos/Tree";
import { Error } from "../Varios/Error";
import { tipos, Tipo } from "../Varios/Tipo";
import { NodoAST } from "../Arbol/NodoAST";
import { NodoCST } from "../Arbol/NodoCST";

export class Relacional extends Nodo {
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
        const resultadoIzq = this.operadorIzq.execute(table, tree);
        if (resultadoIzq instanceof Error) {
            return resultadoIzq;
        }
        const resultadoDer = this.operadorDer.execute(table, tree);
        if (resultadoDer instanceof Error) {
            return resultadoDer;
        }

        if (this.operador === '<') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                if (this.operadorDer.tipo.tipo === tipos.STRING) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        }
        
        
        
        
        else if (this.operador === 'lt') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                if (this.operadorDer.tipo.tipo === tipos.STRING) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        }
        
        
        
        
        
        
        else if (this.operador === '<=') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq <= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq <= resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq <= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq <= resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq <= resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                if (this.operadorDer.tipo.tipo === tipos.STRING) {
                    return resultadoIzq <= resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        }
        
        else if (this.operador === 'gt') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                if (this.operadorDer.tipo.tipo === tipos.STRING) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }else {
                const error = new Error('Semantico',
                    `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } 
        
        
        
        
        
        
        
        
        
        
        
        
        
        else if (this.operador === '>') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                if (this.operadorDer.tipo.tipo === tipos.STRING) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }else {
                const error = new Error('Semantico',
                    `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else if (this.operador === '>=') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq >= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq >= resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq >= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq >= resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq >= resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                if (this.operadorDer.tipo.tipo === tipos.STRING) {
                    return resultadoIzq >= resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else if (this.operador === '!=') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq != resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq != resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq != resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq != resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq != resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                if (this.operadorDer.tipo.tipo === tipos.STRING) {
                    return resultadoIzq != resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }else {
                const error = new Error('Semantico',
                    `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else if (this.operador === '==') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq == resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq == resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq == resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq == resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq == resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.STRING) {
                if (this.operadorDer.tipo.tipo === tipos.STRING) {
                    return resultadoIzq == resultadoDer;
                } else {
                    const error = new Error('Semantico',
                        `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.errores.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.errores.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else {
            const error = new Error('Semantico',
                `Operador desconocido`,
                this.line, this.column);
            tree.errores.push(error);
            // tree.consola.push(error.toString());
            return error;
        }
    }

    getNodo() {
        var nodo:NodoAST  = new NodoAST("");
        nodo.agregarHijo(this.operadorIzq.getNodo());
        nodo.agregarHijo(this.operador + "");
        nodo.agregarHijo(this.operadorDer.getNodo());
        return nodo;
    }

    getNodoCST() {
        var nodo:NodoCST  = new NodoCST("RELACIONAL");
        nodo.agregarHijo(this.operadorIzq.getNodoCST());
        nodo.agregarHijo(this.operador + "");
        nodo.agregarHijo(this.operadorDer.getNodoCST());
        return nodo;
    }
}