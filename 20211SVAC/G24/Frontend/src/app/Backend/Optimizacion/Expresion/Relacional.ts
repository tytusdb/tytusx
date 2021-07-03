import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";
import Termino from "./Termino";

export default class Relacional extends Instruccion {

    private expresion1: Instruccion;
    private operando: String;
    private expresion2: Instruccion;
    constructor(expresion1:Instruccion,operando:String, expresion2: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.expresion1 = expresion1
        this.operando=operando
        this.expresion2= expresion2
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // operando1 operacion operando2
        var operadorizq = this.expresion1.interpretar(arbol, tabla);
        var operadorder = this.expresion2.interpretar(arbol, tabla);
        if (operadorizq != null && operadorder != null) {
            if (this.expresion1 instanceof Termino && this.expresion2 instanceof Termino) {
                return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
            }else {
                if (operadorder.contenido != null && operadorizq.contenido != null) {
                    return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: operadorizq.contenido.toString(), linea: this.fila.toString(), columna: this.columna.toString() }
                }else{
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