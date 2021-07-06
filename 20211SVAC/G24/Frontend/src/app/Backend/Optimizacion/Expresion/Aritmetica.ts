import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";
import Termino from "./Termino";

export default class Aritmetica extends Instruccion {

    private expresion1: Instruccion;
    private operando: String;
    private expresion2: Instruccion;
    constructor(expresion1: Instruccion, operando: String, expresion2: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.expresion1 = expresion1
        this.operando = operando
        this.expresion2 = expresion2
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // operando1 operacion operando2
        var operadorizq = this.expresion1.interpretar(arbol, tabla);
        var operadorder = this.expresion2.interpretar(arbol, tabla);
        if (operadorizq != null && operadorder != null) {
            if (this.expresion1 instanceof Termino && this.expresion2 instanceof Termino) {
                if (this.operando === "+") {
                    // t0= t0+0   o   t0=0+t0
                    if (operadorder.contenido == 0) {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorizq.contenido == 0) {
                        return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    }else {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    }
                } else if (this.operando === "-") {
                    // t0= t0-0   o   t0=0-t0
                    if (operadorder.contenido == 0) {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorizq.contenido == 0) {
                        return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    }else {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    }
                } else if (this.operando === "*") {
                    // t0= t0*1   o   t0=1*t0
                    if (operadorder.contenido == 1) {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorizq.contenido == 1) {
                        return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorder.contenido == 2) {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorizq.contenido == 2) {
                        return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorder.contenido == 0) {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorizq.contenido == 0) {
                        return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    }else {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    }
                } else if (this.operando === "/") {
                    // t0= t0/1   o   t0=1*t0
                    if (operadorder.contenido == 1) {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorizq.contenido == 1) {
                        return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    } if (operadorder.contenido != 0) {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                    } else if (operadorizq.contenido == 0) {
                        return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    }else {
                        return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    }

                }
            } else {
                // en este puede venir contenido ya sea de identificador cosa que no acepta el anterior
                if (operadorder.contenido != null && operadorizq.contenido != null) {
                    if (this.operando === "+") {
                        // t0= t0+0   o   t0=0+t0
                        if (operadorder.contenido == 0) {
                            return { operadorder: operadorder.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorizq.contenido == 0) {
                            return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                        }
                    } else if (this.operando === "-") {
                        // t0= t0-0   o   t0=0-t0
                        if (operadorder.contenido == 0) {
                            return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorizq.contenido == 0) {
                            return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                        }
                    } else if (this.operando === "*") {
                        // t0= t0*1   o   t0=1*t0
                        if (operadorder.contenido == 1) {
                            return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorizq.contenido == 1) {
                            return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorder.contenido == 2) {
                            return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorizq.contenido == 2) {
                            return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorder.contenido == 0) {
                            return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorizq.contenido == 0) {
                            return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                        } else {

                        }
                    } else if (this.operando === "/") {
                        // t0= t0/1   o   t0=1*t0
                        if (operadorder.contenido == 1) {
                            return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorizq.contenido == 1) {
                            return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                        } if (operadorder.contenido != 0) {
                            return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido, linea: this.fila.toString(), columna: this.columna.toString() }
                        } else if (operadorizq.contenido == 0) {
                            return { operadorder: operadorder.contenido, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                        }

                    }
                } else {
                    // en este acepta si hay uno anterior con la estructura 
                    //{ operadorder: arm, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                    // analiza las posibilidades
                    if (operadorder.operadorder != null) {
                        if (this.expresion1 instanceof Termino) {
                            let arm = operadorder.operadorder.toString() + operadorder.operador + operadorder.operadorizq.toString()
                            return { operadorder: arm, operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                        } else {
                            let arm1 = operadorder.operadorder.toString() + operadorder.operador + operadorder.operadorizq.toString()
                            let arm2 = operadorizq.operadorder.toString() + operadorizq.operador + operadorizq.operadorizq.toString()
                            return { operadorder: arm1, operador: this.operando, operadorizq: arm2, linea: this.fila.toString(), columna: this.columna.toString() }
                        }
                    } else if (operadorizq.operadorder != null) {
                        if (this.expresion2 instanceof Termino) {
                            let arm = operadorizq.operadorder.toString() + operadorizq.operador + operadorizq.operadorizq.toString()
                            return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: arm, linea: this.fila.toString(), columna: this.columna.toString() }
                        } else {
                            let arm1 = operadorder.operadorder.toString() + operadorder.operador + operadorder.operadorizq.toString()
                            let arm2 = operadorizq.operadorder.toString() + operadorizq.operador + operadorizq.operadorizq.toString()
                            return { operadorder: arm1, operador: this.operando, operadorizq: arm2, linea: this.fila.toString(), columna: this.columna.toString() }
                        }
                    }
                }
            }
        }
    }

}
