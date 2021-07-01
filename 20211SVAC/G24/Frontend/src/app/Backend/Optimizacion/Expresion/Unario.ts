import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";
import Termino from "./Termino";

export default class Unario extends Instruccion {
    private operando: String;
    private expresion: Instruccion;
    constructor(operando:String, expresion2: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.operando=operando
        this.expresion= expresion2
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // operando1 operacion operando2
        var operadorder = this.expresion.interpretar(arbol, tabla);
        if (operadorder != null) {
            if (this.expresion instanceof Termino) {
                return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: "", linea: this.fila.toString(), columna: this.columna.toString() }
            }else {
                if (operadorder.contenido != null ) {
                    return { operadorder: operadorder.contenido.toString(), operador: this.operando, operadorizq: "", linea: this.fila.toString(), columna: this.columna.toString() }
                }else{
                    if (operadorder.operadorder != null) {
                        if (this.expresion instanceof Termino) {
                            let arm =  operadorder.operador +operadorder.operadorder.toString() 
                            return { operadorder: arm, operador: this.operando, operadorizq: "", linea: this.fila.toString(), columna: this.columna.toString() }
                        } 
                    }
                }
            }
        }
    }

}