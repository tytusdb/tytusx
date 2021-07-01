import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Unset extends Instruccion {
    public Expresion: Instruccion;
    constructor(expresion:Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Expresion= expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // SI ES DE TIPO TERMINO 
        throw new Error("Method not implemented.");
    }

}