import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Concatenar extends Instruccion {
    private operando: String;
    constructor(operando:String, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.operando=operando
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // operando1 operacion operando2
        throw new Error("Method not implemented.");
    }

}